# Default progress options
Router.configure
  progress        : true
  progressDebug   : false
  progressDelay   : false
  progressSpinner : true
  progressTick    : true

# Used to debug the package, if progressDebug is true
debug = ->
  if Router.current().lookupOption 'progressDebug'
    console.log.apply console, arguments

Template.__IronRouterProgress__.created = ->
  self = @

  @ticker  = false
  @delay   = false
  @started = false
  @loading = new ReactiveVar false
  @spinner = new ReactiveVar false
  @done    = new ReactiveVar false
  @percent = new ReactiveVar false

  @functions =
    reset : (element) ->
      debug 'Reset'

      self.functions.stop()

      # Reset our variables
      self.loading.set false
      self.done.set    false
      self.percent.set 0
      self.started =   false

      element.offsetWidth = element.offsetWidth if element

      self

    start : (element) ->
      debug 'Start'

      # Reset our progress
      self.functions.reset element

      # Update the spinner status, if it changed
      self.spinner.set Router.current().lookupOption('progressSpinner') or false

      self.loading.set true

      # If we have a delay, wait with the progress
      delay = Router.current().lookupOption 'progressDelay'
      if delay > 0
        debug 'Delayed'
        self.delay = Meteor.setTimeout ->
          self.started = true
          self.functions.progress()
          self.functions.tick()
        , delay
      else
        debug 'Not delayed'
        self.started = true
        self.functions.progress()
        self.functions.tick()

      self

    progress : (progress = false) ->
      debug 'Progress'

      # XX We need a better random number generation here
      percent    = self.percent.get()
      percentNew = percent + if progress \
        then progress else (100 - percent) * (Math.random() * 0.45 + 0.05) | 0

      if percentNew >= 100
        self.functions.done()
      else
        self.percent.set percentNew
        self.functions.tick()

      self

    tick : ->
      debug 'Tick'

      if Router.current().lookupOption 'progressTick'
        debug 'starting new ticker'
        if self.ticker
          Meteor.clearTimeout self.ticker
          self.ticker = false

        self.ticker = Meteor.setTimeout ->
          self.ticker = false
          self.functions.progress()
        , Math.random() * 750 + 750
      else
        debug 'Not starting ticker'

      self

    done : ->
      debug 'Done'

      self.functions.stop()

      if not self.started
        self.functions.reset()
      else
        _.defer ->
          self.done.set true
        self.loading.set true
        self.percent.set 100
      self

    stop : ->
      debug 'Stop'

      # Clear the timers, if we have any
      if self.ticker
        Meteor.clearTimeout self.ticker
        self.ticker = false
      if self.delay
        Meteor.clearTimeout self.delay
        self.delay = false

      self

  Router.load ->
    debug 'IR:load'
    element = self.find '*'
    self.functions.start element

    @next()
    @

  Router.unload ->
    debug 'IR:unload'
    self.functions.reset()
    @

  Router.onRun ->
    debug 'IR:run'
    self.loading.set true
    @next()
    @

  Router.onRerun ->
    debug 'IR:re-run'
    @next()
    @

  Router.onBeforeAction ->
    debug 'IR:before'
    Tracker.autorun =>
      if @ready()
        self.functions.done()
        self.functions.stop()
      else
        self.functions.progress()
    @next()
    @

  Router.onAfterAction ->
    debug 'IR:after'
    @

  Router.onStop ->
    debug 'IR:stop'
    self.functions.reset()
    @

Template.__IronRouterProgress__.helpers
  data     : -> Template.instance()
  template : ->
    # If progress is disabled in general, don't show a template
    return null if not Router.current()?.lookupOption 'progress'

    if Template.instance().loading.get()
      '__IronRouterProgressDefault__'
    else
      null

Template.__IronRouterProgressDefault__.rendered = ->
  # Used for the CSS reset
  @element = @$ '#iron-router-progress'

Template.__IronRouterProgressDefault__.helpers
  cssClass : ->
    classes = []

    classes.push 'loading' if @loading.get()
    classes.push 'spinner' if @spinner.get()
    classes.push 'done'    if @done.get()

    classes.join ' '
  cssStyle : ->
    styles = []

    styles.push "width:#{@percent.get()}%" if @percent.get()

    styles.join ';'

Template.__IronRouterProgressDefault__.events
  'transitionend #iron-router-progress, webkitTransitionEnd #iron-router-progress, oTransitionEnd #iron-router-progress, otransitionend #iron-router-progress, MSTransitionEnd #iron-router-progress' : (e, template) ->
    # Only reset, if this is the last transition, and that it's not a psuedo selector, such as `:before` and `:after`
    # Due to the open nature, of the CSS, I want people to be able to do whatever they like, and as such
    # simply expecting opacity to reach zero, or specific propertyName to execute won't suffice
    # A more elegant solution should be added, as not all browsers may support transition-property
    # witout their vendor prefixes

    if e.originalEvent.pseudoElement is '' and e.originalEvent.propertyName is _.last template.element.css('transition-property').split ', '
      debug 'transitionend'
      data = Template.currentData()
      data.done.set    false
      data.loading.set false
      data.percent.set false

# Prepare our DOM-element
Meteor.startup ->
  layout = new Iron.Layout
    template : '__IronRouterProgress__'
  layout.insert
    el : document.body

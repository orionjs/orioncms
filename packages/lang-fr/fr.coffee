i18n.map 'fr',
  global:
    save: 'Enregistrer'
    create: 'Créer'
    logout: 'Déconnexion'
    back: 'Retour'
    cancel: 'Annuler'
    delete: 'Effacer'
    confirm: 'Confirmer'
    choose: 'Choisir'
    noPermission: 'Vous n\'avez pas les permissions.'
    passwordNotMatch: 'Les mots de passe ne sont pas identiques'
    optional: 'Optionnel'
  accounts:
    schema:
      emails:
        title: 'Emails'
        address: 'Adresse'
        verified: 'Vérifié'
      password:
        title: 'Mot de passe'
        new: 'Nouveau mot de passe'
        confirm: 'Confirmer votre mot de passe'
      profile: name: 'Nom'
    index:
      title: 'Comptes'
      actions: edit: 'Éditer'
      tableTitles:
        name: 'Nom'
        email: 'Email'
        roles: 'Rôles'
        actions: 'Actions'
    update:
      title: 'Mettre à jour son compte'
      messages: noPermissions: 'Vous n\'avez pas les permissions pour éditer cet utilisateur'
      sections:
        profile: title: 'Profil'
        roles:
          title: 'Rôles'
          selectRoles: 'Sélectionner les rôles de l\'utilisateur'
        changePassword: title: 'Changer le mot de passe'
        deleteUser:
          title: 'Attention danger'
          advice: 'Effacer des utilisateurs peut occasionner des problèmes sur les données.'
          button: 'Effacer utilisateur'
    myAccount: title: 'Mon compte'
    create:
      title: 'Créer un utilisateur'
      createInvitation: 'Créer une invitation'
      createUserNow: 'Créer un utilisateur maintenant'
      inviteOther: 'Inviter d\'autres utilisateurs'
      selectRoles: 'Sélectionner de nouveaux rôles pour l\'utilisateur'
      email: 'Email'
      messages: successfullyCreated: 'Invitation créée avec succès'
    changePassword: title: 'Changer le mot de passe'
    updateProfile: title: 'Mettre à jour le profil'
    register:
      title: 'Enregistrer'
      registerButton: 'Enregistrer'
      fields:
        email: 'Email'
        name: 'Nom'
        password: 'Mot de passe'
        confirmPassword: 'Mot de passe (de nouveau)'
      messages:
        invalidEmail: 'Email invalide'
        invalidInvitationCode: 'Code d\'invitation invalide'
  collections:
    create: title: 'Créer un {$1}'
    update: title: 'Mettre à jour {$1}'
    delete:
      title: 'Effacer {$1}'
      confirmQuestion: 'Êtes-vous sûr de vouloir effacer ce {$1} ?'
    common:
      defaultPluralName: 'objets'
      defaultSingularName: 'objet'
  config: update: title: 'Configuration'
  dictionary: update: title: 'Dictionnaire'
  filesystem: messages:
    notFound_id: 'Fichier non trouvé [{$i}]'
    errorUploading: 'Erreur de chargement de fichier'
    errorRemoving: 'Erreur d\'effacement de fichier'
  pages:
    schema:
      title: 'Titre'
      url: 'URL'
    index: title: 'Pages'
    create:
      title: 'Créer une page'
      chooseTemplate: 'Choisir un modèle'
    update: title: 'Mettre à jour une page'
    delete:
      title: 'Effacer une page'
      confirmQuestion: 'Êtes-vous sûr de vouloir effacer cette page ?'
  attributes:
    users:
      pluralName: 'utilisateurs'
      singularName: 'utilisateur'
    file:
      choose: 'Choisir un fichier'
      noFile: 'Pas de fichier'
  tabular:
    search: 'Rechercher:'
    info: 'Affiche _START_ à _END_ de _TOTAL_ entrées'
    infoEmpty: 'Affiche 0 à 0 de 0 entrées'
    lengthMenu: 'Affiche _MENU_ entrées'
    emptyTable: 'Aucune données disponibles pour la table'
    paginate:
      first: 'Premier'
      previous: 'Précédent'
      next: 'Suivant'
      last: 'Dernier'

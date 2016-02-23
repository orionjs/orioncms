i18n.map('de', {
  global: {
    save: 'Speichern',
    create: 'Erstellen',
    logout: 'Logout',
    back: 'Zurück',
    cancel: 'Abbrechen',
    delete: 'Löschen',
    confirm: 'Bestätigen',
    choose: 'Auswählen',
    noPermission: 'Sie haben keine Berechtigung',
    passwordNotMatch: 'Passwörter stimmen nicht überein',
    optional: 'Optional'
  },
  accounts: {
    schema: {
      emails: {
        title: 'Emails',
        address: 'Adresse',
        verified: 'Verifiziert'
      },
      password: {
        title: 'Passwort',
        new: 'Neues Passwort',
        confirm: 'Passwort bestätigen'
      },
      profile: {
        name: 'Name'
      }
    },
    index: {
      title: 'Accounts',
      noName: 'Kein Name',
      actions: {
        edit: 'Bearbeiten',
        sendEnrollmentEmail: 'Sende Einladungs Email'
      },
      tableTitles: {
        name: 'Name',
        services: 'Login Method',
        email: 'Email',
        roles: 'Rollen',
        actions: 'Aktionen'
      }
    },
    update: {
      title: 'Update Account',
      messages: {
        noPermissions: 'Sie haben keine Berechtigung diesen Nutzer zu bearbeiten'
      },
      sections: {
        profile: {
          title: 'Profil'
        },
        roles: {
          title: 'Rollen',
          selectRoles: 'Wähle die Nutzer Rollen'
        },
        changePassword: {
          title: 'Passwort ändern'
        },
        deleteUser: {
          title: 'Achtung Gefahr',
          advice: 'Nutzer zu löschen kann Probleme bereiten.',
          button: 'Nutzer löschen'
        }
      }
    },
    myAccount: {
      title: 'Mein Account',
    },
    create: {
      title: 'Nutzer erstellen',
      createInvitation: 'Einladung erstellen',
      createUserNow: 'Nutzer jetzt erstellen',
      inviteOther: 'Andere einladen',
      selectRoles: 'Neue Nutzerrolle wählen',
      email: 'Email',
      messages: {
        successfullyCreated: 'Einladung erfolgreich erstellt'
      }
    },
    changePassword: {
      title: 'Passwort ändern',
    },
    updateProfile: {
      title: 'Update Profil',
    },
    register: {
      title: 'Registrieren',
      registerButton: 'Registrieren',
      fields: {
        email: 'Email',
        name: 'Name',
        password: 'Passwort',
        confirmPassword: 'Passwort (nochmal)'
      },
      messages: {
        invalidEmail: 'Ungültige Email',
        invalidInvitationCode: 'Ungültiger Einladungs Code',
      }
    }
  },
  collections: {
    create: {
      title: 'Erstelle ein/eine {$1}'
    },
    update: {
      title: 'Update {$1}'
    },
    delete: {
      title: 'Lösche {$1}',
      confirmQuestion: 'Bist du sicher das du diese/n {$1} löschen möchtest?'
    },
    common: {
      defaultPluralName: 'Einträge',
      defaultSingularName: 'Eintrag',
    }
  },
  config: {
    update: {
      title: 'Config',
    }
  },
  dictionary: {
    update: {
      title: 'Wörterbuch'
    }
  },
  filesystem: {
    messages: {
      notFound_id: 'Datei nicht gefunden [{$i}]',
      errorUploading: 'Fehler beim Hochladen der Datei',
      errorRemoving: 'Fehler beim Löschen der Datei',
    }
  },
  pages: {
    schema: {
      title: 'Titel',
      url: 'Url',
    },
    index: {
      title: 'Seite',
    },
    create: {
      title: 'Seite erstellen',
      chooseTemplate: 'Template wählen'
    },
    update: {
      title: 'Update Seite',
    },
    delete: {
      title: 'Seite lösche',
      confirmQuestion: 'Sind Sie sicher dass Sie diese Seite löschen möchten?'
    }
  },
  attributes: {
    users: {
      pluralName: 'Nutzer',
      singularName: 'Nutzer',
    },
    file: {
      choose: 'Datei wählen',
      noFile: 'Keine Datei',
    },
    image: {
      choose: 'Bild wählen'
    },
    images: {
      choose: 'Bilder auswählen',
      clickToRemove: 'Zum Entfernen klicken'
    }
  },
  tabular: {
    search: 'Suche:',
    info: 'Zeige _START_ bis _END_ von _TOTAL_ Einträgen',
    infoEmpty: 'Zeige 0 bis 0 von 0 Einträgen',
    lengthMenu: 'Zeige _MENU_ Einträge',
    emptyTable: 'Keine Daten in der Tabelle vorhanden',
    paginate: {
      first: 'Erste',
      previous: 'Vorherige',
      next: 'Nächste',
      last: 'Letzte',
    }
  }
});

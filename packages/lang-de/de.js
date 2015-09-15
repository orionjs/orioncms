i18n.map('de', {
  global: {
    save: 'Speichern',
    create: 'Erstellen',
    logout: 'Abmelden',
    back: 'Zurück',
    cancel: 'Abbruch',
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
        address: 'Adressen',
        verified: 'Bestätigt'
      },
      password: {
        title: 'Passwort',
        new: 'Neues Passwort',
        confirm: 'Wiederholung Passwort'
      },
      profile: {
        name: 'Name'
      }
    },
    index: {
      title: 'Benutzerkonten',
      actions: {
        edit: 'Bearbeiten',
      },
      tableTitles: {
        name: 'Name',
        email: 'Email',
        roles: 'Berechtigungen',
        actions: 'Aktionen'
      }
    },
    update: {
      title: 'Benutzerkonto aktualisieren',
      messages: {
        noPermissions: 'Sie haben keine Berechtigung dieses Benutzerkonto zu bearbeiten'
      },
      sections: {
        profile: {
          title: 'Profil'
        },
        roles: {
          title: 'Berechtigungen',
          selectRoles: 'Auswahl der Berechtigungen für den Benutzer'
        },
        changePassword: {
          title: 'Passwort ändern'
        },
        deleteUser: {
          title: 'Achtung bei Ausführung',
          advice: 'Löschen der Benutzerkonten kann Probleme verursachen.',
          button: 'Benutzerkonto löschen'
        }
      }
    },
    myAccount: {
      title: 'Mein Benutzerkonto',
    },
    create: {
      title: 'Benutzer erstellen',
      createInvitation: 'Einladung erstellen',
      createUserNow: 'Benutzerkonto direkt erstellen',
      inviteOther: 'Andere einladen',
      selectRoles: 'Festlegung der Berechtigungen für neue Benutzer',
      email: 'Email',
      messages: {
        successfullyCreated: 'Einladungen wurde erfolgreich erstellt'
      }
    },
    changePassword: {
      title: 'Passwort ändern',
    },
    updateProfile: {
      title: 'Profil aktualisieren',
    },
    register: {
      title: 'Registrierung',
      registerButton: 'Registrieren',
      fields: {
        email: 'Email',
        name: 'Name',
        password: 'Passwort',
        confirmPassword: 'Wiederholung Passwort'
      },
      messages: {
        invalidEmail: 'Ungültige Email',
        invalidInvitationCode: 'Ungültiger Einladungs-Code',
      }
    }
  },
  collections: {
    create: {
      title: '{$1} erstellen'
    },
    update: {
      title: '{$1} aktualisieren'
    },
    delete: {
      title: '{$1} löschen',
      confirmQuestion: '{$1} soll gelöscht werden. Sind Sie sicher?'
    },
    common: {
      defaultPluralName: 'Einträge',
      defaultSingularName: 'Eintrag',
    }
  },
  config: {
    update: {
      title: 'Konfiguration',
    }
  },
  dictionary: {
    update: {
      title: 'Dictionary'
    }
  },
  filesystem: {
    messages: {
      notFound_id: 'Datei nicht gefunden [{$i}]',
      errorUploading: 'Fehler beim Hochladen der Datei',
      errorRemoving: 'Fehler beim Löschen der Datei',
    }
  },
  pages: {
    schema: {
      title: 'Titel',
      url: 'Url',
    },
    index: {
      title: 'Seiten',
    },
    create: {
      title: 'Seite erstellen',
      chooseTemplate: 'Template auswählen'
    },
    update: {
      title: 'Seite aktualisieren',
    },
    delete: {
      title: 'Seite löschen',
      confirmQuestion: 'Diese Seite soll gelöscht werden. Sind Sie sicher?'
    }
  },
  attributes: {
    users: {
      pluralName: 'Benutzer',
      singularName: 'Benutzer',
    },
    file: {
      choose: 'Datei auswählen',
      noFile: 'Keine Datei',
    },
    image: {
      choose: 'Bild auswählen'
    },
    images: {
      choose: 'Bilder auswählen',
      clickToRemove: 'Anklicken zum Löschen'
    }
  },
  tabular: {
    search: 'Suchen:',
    info: 'Einträge: _START_ von _END_ - Gesamt: _TOTAL_',
    infoEmpty: 'Keine Einträge vorhanden',
    lengthMenu: 'Anzeige von _MENU_ Einträgen',
    emptyTable: 'Keine Daten in der Tabelle vorhanden',
    paginate: {
      first: 'Anfang',
      previous: 'Zurück',
      next: 'Weiter',
      last: 'Ende',
    }
  }

});

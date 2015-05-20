i18n.map('en', {
  global: {
    save: 'Save',
    create: 'Create',
    logout: 'Logout',
    back: 'Back',
    cancel: 'Cancel',
    delete: 'Delete',
    confirm: 'Confirm',
    choose: 'Choose',
    noPermission: 'You have no permissions',
  },
  accounts: {
    index: {
      title: 'Accounts',
      actions: {
        editRoles: 'Edit Roles',
      },
      tableTitles: {
        name: 'Name',
        email: 'Email',
        roles: 'Roles',
        actions: 'Actions'
      }
    },
    myAccount: {
      title: 'My Account',
      updateProfile: 'Update Profile',
      changePassword: 'Change Password',
    },
    invite: {
      title: 'Invite',
      inviteOther: 'Invite Other',
      selectRoles: 'Select new user roles',
      email: 'Email (optional)',
      messages: {
        successfullyCreated: 'Invitation created successfully'
      }
    },
    changePassword: {
      title: 'Change Password',
    },
    updateProfile: {
      title: 'Update Profile',
    },
    updateRoles: {
      title: 'Update User Roles',
      selectRoles: 'Select user roles',
      messages: {
        noPermissions: 'You have no permissions to edit roles'
      }
    },
    register: {
      title: 'Register',
      registerButton: 'Register',
      fields: {
        email: 'Email',
        name: 'Name',
        password: 'Password',
        confirmPassword: 'Password (again)'
      },
      messages: {
        invalidEmail: 'Invalid Email',
        passwordNotMatch: 'Password doesn\'t match',
        invalidInvitationCode: 'Invalid invitation code',
      }
    }
  },
  collections: {
    create: {
      title: 'Create a {$1}'
    },
    update: {
      title: 'Update {$1}'
    },
    delete: {
      title: 'Delete {$1}',
      confirmQuestion: 'Are you sure you wan\'t to delete this {$1}'
    },
    common: {
      defaultPluralName: 'items',
      defaultSingularName: 'item',
    }
  },
  config: {
    update: {
      title: 'Config',
    }
  },
  dictionary: {
    update: {
      title: 'Dictionary'
    }
  },
  filesystem: {
    messages: {
      notFound_id: 'File not found [{$i}]',
      errorUploading: 'Error uploading file',
      errorRemoving: 'Error removing file',
    }
  },
  pages: {
    index: {
      title: 'Pages',
    },
    create: {
      title: 'Create page',
      chooseTemplate: 'Choose Template'
    },
    update: {
      title: 'Update page',
    },
    delete: {
      title: 'Delete page',
      confirmQuestion: 'Are you sure you wan\'t to delete this page'
    }
  },
  attributes: {
    users: {
      pluralName: 'users',
      singularName: 'user',
    }
  }
})
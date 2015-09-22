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
    passwordNotMatch: 'Passwords doesn\'t match',
    optional: 'Optional'
  },
  accounts: {
    schema: {
      emails: {
        title: 'Emails',
        address: 'Address',
        verified: 'Verified'
      },
      password: {
        title: 'Password',
        new: 'New Password',
        confirm: 'Confirm Password'
      },
      profile: {
        name: 'Name'
      }
    },
    index: {
      title: 'Accounts',
      noName: 'No Name',
      actions: {
        edit: 'Edit',
        sendEnrollmentEmail: 'Send Enrollment Email'
      },
      tableTitles: {
        name: 'Name',
        services: 'Login method',
        email: 'Email',
        roles: 'Roles',
        actions: 'Actions'
      }
    },
    update: {
      title: 'Update Account',
      messages: {
        noPermissions: 'You have no permissions to edit this user'
      },
      sections: {
        profile: {
          title: 'Profile'
        },
        roles: {
          title: 'Roles',
          selectRoles: 'Select user roles'
        },
        changePassword: {
          title: 'Change Password'
        },
        deleteUser: {
          title: 'Danger Ahead',
          advice: 'Deleting users can cause problems.',
          button: 'Delete User'
        }
      }
    },
    myAccount: {
      title: 'My Account',
    },
    create: {
      title: 'Create a User',
      createInvitation: 'Create invitation',
      createUserNow: 'Create user now',
      inviteOther: 'Invite Other',
      selectRoles: 'Select new user roles',
      email: 'Email',
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
      confirmQuestion: 'Are you sure you wan\'t to delete this {$1}?'
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
    schema: {
      title: 'Title',
      url: 'Url',
    },
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
      confirmQuestion: 'Are you sure you wan\'t to delete this page?'
    }
  },
  attributes: {
    users: {
      pluralName: 'users',
      singularName: 'user',
    },
    file: {
      choose: 'Choose file',
      noFile: 'No file',
    },
    image: {
      choose: 'Choose image'
    },
    images: {
      choose: 'Choose the images',
      clickToRemove: 'Click to remove'
    }
  },
  tabular: {
    search: 'Search:',
    info: 'Showing _START_ to _END_ of _TOTAL_ entries',
    infoEmpty: 'Showing 0 to 0 of 0 entries',
    lengthMenu: 'Show _MENU_ entries',
    emptyTable: 'No data available in table',
    paginate: {
      first: 'First',
      previous: 'Previous',
      next: 'Next',
      last: 'Last',
    }
  }
});

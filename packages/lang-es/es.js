i18n.map('en', {
  global: {
    save: 'Guardar',
    create: 'Crear',
    logout: 'Salir',
    back: 'Atrás',
    cancel: 'Cancelar',
    delete: 'Borrar',
    confirm: 'Confirmar',
    choose: 'Elegir',
    noPermission: 'No tienes permisos',
  },
  accounts: {
    index: {
      title: 'Cuentas',
      actions: {
        editRoles: 'Editar Roles',
      },
      tableTitles: {
        name: 'Nombre',
        email: 'Email',
        roles: 'Roles',
        actions: 'Acciones'
      }
    },
    myAccount: {
      title: 'Mi Cuenta',
    },
    invite: {
      title: 'Invitar usuarios',
      inviteOther: 'Invitar a otro',
      selectRoles: 'Selecciona los roles para el nuevo usuario',
      email: 'Email (opcional)',
      inviteButton: 'Invitar',
      messages: {
        successfullyCreated: 'La invitación fue creada satisfactoriamente'
      }
    },
    changePassword: {
      title: 'Cambiar contraseña',
    },
    updateProfile: {
      title: 'Editar perfil',
    },
    updateRoles: {
      title: 'Editar los roles del usuario',
      selectRoles: 'Selecciona los roles',
      messages: {
        noPermissions: 'No tienes permisos para cambiar roles'
      }
    },
    register: {
      title: 'Registrarse',
      registerButton: 'Registrarse',
      fields: {
        email: 'Email',
        name: 'Nombre',
        password: 'Contraseña',
        confirmPassword: 'Confirmar contraseña'
      },
      messages: {
        invalidEmail: 'Email invalido',
        passwordNotMatch: 'Las contraseñas no son iguales',
        invalidInvitationCode: 'El código de invitacion es invalido',
      }
    }
  },
  collections: {
    create: {
      title: 'Crear un {$1}'
    },
    update: {
      title: 'Actualizar {$1}'
    },
    delete: {
      title: 'Borrar {$1}',
      confirmQuestion: '¿Estás seguro de que quieres borrar este {$1}?'
    },
    common: {
      defaultPluralName: 'items',
      defaultSingularName: 'item',
    }
  },
  config: {
    update: {
      title: 'Configuración',
    }
  },
  dictionary: {
    update: {
      title: 'Diccionario'
    }
  },
  filesystem: {
    messages: {
      notFound_id: 'Archivo no encontrado [{$i}]',
      errorUploading: 'Error subiendo archivo',
      errorRemoving: 'Error borrando archivo',
    }
  },
  pages: {
    index: {
      title: 'Páginas',
    },
    create: {
      title: 'Crear página',
      chooseTemplate: 'Elegir plantilla'
    },
    update: {
      title: 'Editar página',
    },
    delete: {
      title: 'Borrar página',
      confirmQuestion: '¿Estás seguro de que quieres borrar esta página?'
    }
  },
  attributes: {
    users: {
      pluralName: 'usuarios',
      singularName: 'usuario',
    },
    file: {
      choose: 'Elegir archivo',
      noFile: 'Ningún archivo seleccionado',
    }
  }
})
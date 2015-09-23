i18n.map('es', {
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
    passwordNotMatch: 'Las contraseñas no son iguales',
    optional: 'Opcional'
  },
  accounts: {
    schema: {
      emails: {
        title: 'Emails',
        address: 'Dirección',
        verified: 'Verificado'
      },
      password: {
        title: 'Contraseña',
        new: 'Nueva Contraseña',
        confirm: 'Confirmar Contraseña'
      },
      profile: {
        name: 'Nombre'
      }
    },
    index: {
      title: 'Cuentas',
      noName: 'Sin Nombre',
      actions: {
         edit: 'Editar',
         sendEnrollmentEmail: 'Enviar Email de Inscripción'
      },
      tableTitles: {
        name: 'Nombre',
        services: 'Inicio de Sesión',
        email: 'Email',
        roles: 'Roles',
        actions: 'Acciones'
      }
    },
    update: {
      title: 'Editar Cuenta',
      messages: {
        noPermissions: 'No tienes permisos para editar este usuario',
      },
      sections: {
        profile: {
          title: 'Perfil'
        },
        roles: {
          title: 'Roles',
          selectRoles: 'Selecciona los roles'
        },
        changePassword: {
          title: 'Cambiar Contraseña'
        },
        deleteUser: {
          title: 'Borrar usuario',
          advice: 'Borrar usuarios puede causar problemas.',
          button: 'Borrar Usuario'
        }
      }
    },
    myAccount: {
      title: 'Mi Cuenta',
    },
    create: {
      title: 'Crear un usuario',
      createInvitation: 'Crear invitación',
      createUserNow: 'Crear usuario ahora',
      inviteOther: 'Invitar a otro',
      selectRoles: 'Selecciona los roles para el nuevo usuario',
      email: 'Email',
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
    schema: {
      title: 'Título',
      url: 'Url',
    },
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
    },
    image: {
      choose: 'Elegir imagen'
    },
    images: {
      choose: 'Elige las imagenes',
      clickToRemove: 'Toca para eliminar'
    }
  },
  tabular: {
    search: 'Buscar:',
    info: 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
    infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
    lengthMenu: 'Mostrar _MENU_ registros',
    emptyTable: 'Ningún dato disponible en esta tabla',
    paginate: {
      first: 'Primero',
      previous: 'Anterior',
      next: 'Siguente',
      last: 'Último',
    }

  }
});

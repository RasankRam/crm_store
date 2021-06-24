let show_init_config = {
  onShow: modal => {
    if (document.querySelectorAll('.material-tooltip').length !== 0) {
      document.querySelectorAll('.material-tooltip').forEach(item => {
        item.style.zIndex = '-1'
      })
    }

    if (document.querySelector('.navbar')) {
      document.querySelector('.navbar').style.zIndex = '-1'
    }
    if (document.querySelector('.btn_create_plus')) {
      document.querySelector('.btn_create_plus').style.zIndex = '-1'
    }

    document.querySelectorAll('.waves-effect').forEach(item => {
      if (!item.closest('.modal')) {
        item.style.zIndex = '-1'
      }
    })

    if (document.querySelector('.sidenav')) {
      document.querySelector('.sidenav').style.zIndex = '-1'
    }
  },
  onClose: modal => {
    if (document.querySelectorAll('.material-tooltip').length !== 0) {
      document.querySelectorAll('.material-tooltip').forEach(item => {
        item.style.zIndex = '2000'
      })
    }

    if (document.querySelector('.navbar')) {
      document.querySelector('.navbar').style.zIndex = '1000'
    }
    if (document.querySelector('.btn_create_plus')) {
      document.querySelector('.btn_create_plus').style.zIndex = 'auto'
    }
    if (document.querySelector('.sidenav')) {
      document.querySelector('.sidenav').style.zIndex = '1'
    }

    document.querySelectorAll('.waves-effect').forEach(item => {
      if (!item.closest('.modal')) {
        item.style.zIndex = 'auto'
      }
    })
  }
}

module.exports = show_init_config

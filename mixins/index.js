export const backRouteMixin = {
    methods: {
        goToPrv() {
            this.$router.go(-1);
        }
    },
}

export const bottomNav =  {
    computed: {
      moveForBottomNavStyle() {
        if (this.$vuetify.breakpoint.smAndDown) {
          return "bottom: 65px"
        } else {
            return "bottom: 80px"
        }
      },
    }
  }
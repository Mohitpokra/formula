import config from '../config/frontend/index';
export const state = () => ({
  publicData: [],
  filterData: []
})

export const getters = {

}

export const mutations = {
    filterData(state, paylod) {
        state.filterData = paylod.filter;
    }

}

export const actions = {
  async getPublicData({
    commit
  }) {
    try {
      let data = await this.$axios.$get(`${config.reqHost}/api/public/nexted`);
      let items = [];
      data.main_categories.forEach((item, index) => {
        let obj = {};
        obj.id = index;
        obj.name = item.title;
        obj.to = `/${item.slug}`;
        obj.children = [];
        item.categories.forEach((item_1) => {
          let obj_1 = {};
          obj_1.id =  item_1._id;
          obj_1.name = item_1.title;
          obj_1.to = `${obj.to}/${item_1.slug}`;
          obj_1.children = [];

          item_1.sub_categories.forEach((item_2) => {
            let obj_2 = {};
            obj_2.id = item_2._id;
            obj_2.name = item_2.title;
            obj_2.to = `${obj_1.to}/${item_2.slug}`;
            obj_2.children = [];

            item_2.products.forEach((item_3) => {
              let obj_3 = {};
              obj_3.id = item_3._id;
              obj_3.name = item_3.title;
              obj_3.to = obj_2.to;
              obj_2.children.push(obj_3);
            })
            obj_1.children.push(obj_2);
          })
          obj.children.push(obj_1);
        })
        items.push(obj);
      });
      commit('filterData', {
        filter: items
      })
      console.log(items);
    } catch (err) {
        console.log(err);
    }

  },
}

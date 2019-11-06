export const state = () => ({
  mainCategories: [],
  test: 'this it the test msg'
})

export const getters = {}

export const mutations = {
  initalizeMainCategories(state, payload) {
    state.mainCategories = payload.mainCategories;
  }
}

export const actions = {
  async getMainCategories({
    commit
  }) {
    try {
      let data = await this.$axios.$get('https://all-formula.herokuapp.com/api/main-category/');
      let mainCategoriesData = data.map(item => {
        return {
          id: item._id,
          title: item.title,
          description: item.description
        }
      });

      let categoriesData = data.reduce((allCategories, mainCategory) => {
        let categories = mainCategory.categories.map(category => {
          return {
            id: category._id,
            title: category.title,
            description: category.description,
            mainCategory: {
              id: category.main_category._id,
              title: category.main_category.title,
              description: category.main_category.description
            }
          }
        })

        return [...allCategories, ...categories];
      }, []);

      let subCategoriesData = data.reduce((allSubCategories, mainCategory) => {
        let subCategories = mainCategory.categories.reduce((allSubCategories, category) => {
          let subCategories = category.sub_categories.map(subCategory => {
            return {
              id: subCategory._id,
              title: subCategory.title,
              description: subCategory.description,
              category: {
                id: subCategory.category._id,
                title: subCategory.category.title,
                discription: subCategory.category.description
              }
            }
          })
          return [...allSubCategories, ...subCategories];
        }, []);
        return [...allSubCategories, ...subCategories];
      }, []);

      let formulasData = data.reduce((allFormuals, mainCategory) => {
        let formulas = mainCategory.categories.reduce((allFormuals, category) => {
          let formulas = category.sub_categories.reduce((allFormuals, subCategory) => {
            let formulas = subCategory.products.map(formula => {
              return {
                id: formula._id,
                title: formula.title,
                description: formula.description,
                equation: formula.equation,
                subCategory: {
                  id: formula.sub_category._id,
                  title: formula.sub_category.title,
                  description: formula.sub_category.description
                }
              }
            })
            return [...allFormuals, ...formulas];
          }, []);
          return [...formulas, ...allFormuals];
        }, [])
        return [...formulas, ...allFormuals];
      }, []);

      commit('initalizeMainCategories', {
        mainCategories: mainCategoriesData
      })

      commit('category/initalizeCategories', {
        categories: categoriesData
      }, {
        root: true
      });

      commit('subCategory/initalizeSubCategories', {
        subCategories: subCategoriesData
      }, {
        root: true
      })

      commit('formula/initalizeFormulas', {
        formulas: formulasData
      }, {
        root: true
      })
    } catch (err) {
      console.log(err);
    }
  }
}

//2.同步修改数据的方法
import {GETSELLER,GETGOODS,GETRATINGS} from "store/mutation_type.js"
export default{
  [GETSELLER](state,seller){
    state.seller = seller
  },
  [GETGOODS](state,goods){
    state.goods = goods
  },
  [GETRATINGS](state,ratings){
    state.ratings = ratings
  }
}
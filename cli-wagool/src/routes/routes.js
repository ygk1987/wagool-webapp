import goods from "@/pages/goods/goods"
import ratings from "@/pages/ratings/ratings"
import seller from "@/pages/seller/seller"
export default[
  {path:"/goods",component:goods},
  {path:"/ratings",component:ratings},
  {path:"/seller",component:seller},
  {path:"/",redirect:"/goods"}
]
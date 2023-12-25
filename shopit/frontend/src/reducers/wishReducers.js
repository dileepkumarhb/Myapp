import { ADD_TO_WISH, REMOVE_WISH_ITEM,} from '../constants/wishConstants';

export const wishReducer = (state = { wishItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_WISH:
      const resultItem = action.payload;
      const isItemExists = state.wishItems.find(i => i.product === resultItem.product)

      if (isItemExists) {
        return {
          ...state,
          wishItems: state.wishItems.map(i => i.product === isItemExists.product ? resultItem : i)
        }
      } else {
        return {
          ...state,
          wishItems: [...state.wishItems, resultItem]
        }
      }

    case REMOVE_WISH_ITEM:
      return {
        ...state,
        wishItems: state.wishItems.filter(i => i.product !== action.payload)
      }

    default:
      return state
  }
}
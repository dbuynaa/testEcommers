import { useHandleCart } from 'modules/contextHooks'
import { ItemBase } from 'modules/types'
import React from 'react'
import Minus from 'icons/Minus'
import Plus from 'icons/Plus'

import Input from 'ui/Input'
import LoadingDots from 'ui/LoadingDots'
import {toast} from 'react-toastify'
import Button from 'ui/Button'


const Countbtn = ({productId,count,remainder}:ItemBase) => {
  const {loading,handleUpdateCart:updateCart}= useHandleCart();

   const handleUpdateCart=(value) =>{
    const number = parseInt(value||'0')
    if((remainder||0>=number)){
      return updateCart({productId,count:number})
    }
    return toast.error('Бүтээгдэхүүний үлдэгдэл хүрэлцэхгүй байна')
   }
  return (
    <div>
       <div className='counter flex items-center px-1'>
        <Button className='minus'
                variant='ghost' 
                disabled={loading}
                onClick={()=>handleUpdateCart(count-1)}>
                  <Minus/>
        </Button>
        <Input className='count-wrap text-center'
               value={count}
               onChange={(value)=>handleUpdateCart(value)}/>
        <Button className='plus' 
                variant='ghost'
                disabled={loading}
                onClick={()=>handleUpdateCart(count+1)}>
                <Plus/>
                </Button>
        <Button className='trashX'></Button>        
       </div>
       {loading && (
        <div className="order-item-loader flex items-center justify-center rounded">
          <LoadingDots />
        </div>
      )}
    </div>
  )
}

export default Countbtn

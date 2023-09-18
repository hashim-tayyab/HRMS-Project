import React from 'react'
import './Message.css'

function Message({message, own}) {
  return (
    <div className={own? 'message own' : 'message'}>
        <div className='messageTop'>
            <p className='textMessage'>
                {message? (<>
                  {message.text}
                  </>
                )
              :(
                <>No Message</>
              )}
            </p>
        </div>
    </div>
  )
}

export default Message
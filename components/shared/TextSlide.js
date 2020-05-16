import { useState } from 'react'
import { useTransition, animated} from 'react-spring'
import { FiChevronRight } from 'react-icons/fi'
import colors from '../../common/colors'

function Text(slide, titles) {
  return (
    <div>
      <a>{titles[slide]}</a>
      <style jsx>{`
        a {
          font-size: 1.5em;
          border-bottom: 2px solid ${colors.red};
        }
      `}</style>
    </div>
  )
}

function TextSlide(props) {
  let { titles } = props
  if(!titles) return null
  const [slide, setSlide] = useState(0);

  const transitions = useTransition(slide, null, {
    from: { position:'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
    config: { duration: 750 }
  })
  
  const moveSlide =(add)=> {
    let addition = slide+add
    if(addition >= 0 && addition < titles.length) {
      setSlide(slide+add)
    }else {
      setSlide(0)
    }
  }

  return (
    <div className="container ">
      <div className="slider">
        {
          transitions.map(({ item, key, props }) => <animated.div key={key} style={props}>
              {Text(slide, titles)}
            </animated.div>) 
        }
        <a onClick={()=>moveSlide(1)}><FiChevronRight /></a>
      </div>
      <style jsx>{`
        .slider {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        a {
          font-size: 1.5em;
          position: absolute;
          right: 0
        }
      `}</style>
    </div>
  )
}

export default TextSlide

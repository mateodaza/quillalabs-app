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
    from: { opacity: 0 },
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
    <div>
      <div className="slider">
        {
          transitions.map(({ item, key, props }) => <animated.div key={key} style={props}>
            {Text(slide, titles)}
          </animated.div>) 
        }
        <a onClick={()=>moveSlide(1)}><FiChevronRight size="1.5em"/></a>
      </div>
      <style jsx>{`
        .slider {
          display: flex;
          flex: 1;
          flex-direction: row;
          justify-content: space-between;
          border-bottom: 2px solid ${colors.red};
        }
      `}</style>
    </div>
  )
}

export default TextSlide

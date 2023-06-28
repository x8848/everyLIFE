import classNames from 'classnames'
import { FC } from 'react'
import { ContentProps } from '../../utils/types'

const Content: FC<ContentProps> = ({ children, className }) => {
  return <div className={classNames('content', className)}>{children}</div>
}

export default Content

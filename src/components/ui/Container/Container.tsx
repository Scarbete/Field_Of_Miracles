import { FC, ReactNode } from 'react'
import classnames from 'classnames'
import styles from './Container.module.scss'

type Props = {
    children: ReactNode
    className?: string
}

const Container: FC<Props> = (props) => {

    const {
        children,
        className
    } = props

    return (
        <div className={classnames(styles.container, className)}>
            {children}
        </div>
    )
}

export default Container
import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'
import { useController } from 'react-hook-form'


type Props = {
    control: any
    name: string
    error?: string
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>


const InputField: FC<Props> = (props) => {

    const {
        control,
        name,
        error,
        ...otherProps
    } = props

    const { field: { value, onChange } } = useController({
        name,
        control
    })

    return (
        <label>
            {error && <span>{error}</span>}
            <input
                value={value}
                onChange={onChange}
                type={'text'}
                {...otherProps}
            />
        </label>
    )
}

export default InputField
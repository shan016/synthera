import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import Link from "next/link";

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>,
    name: Path<T>,
    label?: string,
    placeholder?: string,
    type?: 'text' | 'email' | 'password' | 'file' | 'hidden',
    forgot?: boolean
}

const FormField = <T extends FieldValues>({ control, name, label, placeholder, type, forgot }: FormFieldProps<T>) => (
    <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
            <FormItem>
                {!forgot ? (
                    <FormLabel>{ label }</FormLabel>
                ) : (
                    <div className="flex justify-between items-center">
                        {label && (
                            <FormLabel>{ label }</FormLabel>
                        )}
                        <Link href='/forgot-password' className="ml-auto inline-block text-sm underline">Forgot your password?</Link>
                    </div>
                )}
                <FormControl>
                    <Input id={name} placeholder={placeholder} {...field} type={type}/>
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
            </FormItem>
        )}
    />
)

export default FormField;
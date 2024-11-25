'use client';

import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";

type Inputs = {
    email: string
    password: string
}

export default function LoginForm() {
  const {register, handleSubmit, formState: {errors, isValid}} = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <>
        <Card className="w-2/5 mx-auto">
            <CardHeader className="flex flex-col items-center justify-center">
                <div className="flex flex-col gap-2 items-center text-secondary">
                    <div className="flex flex-row items-center gap-3">
                        <GiPadlock size={30} />
                        <h1 className="text-3xl font-semibold">Login</h1>
                    </div>
                    <p className="text-neutral-500">Welcome back to NextMatch</p>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Input
                            defaultValue=""
                            label="Email"
                            variant="bordered"
                            {...register('email', {required: 'Email is required.'})}
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message}
                        />
                        <Input
                            defaultValue=""
                            label="Password"
                            variant="bordered"
                            type="password"
                            {...register('password', {required: 'Password is required.'})}
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message}
                        />
                        <Button isDisabled={!isValid} fullWidth color="secondary" type="submit">
                            Login
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    </>
  )
}

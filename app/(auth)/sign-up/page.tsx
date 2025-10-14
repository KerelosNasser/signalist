'use client'
import React from 'react'
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import InputField from "@/components/Forms/inputField";
import SelectField from "@/components/Forms/selectField";
import {INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS} from "@/lib/constants";
import {CountrySelectField} from "@/components/Forms/countrySelectField";
import FooterLink from "@/components/Forms/footerLink";

const signUp = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: {errors, isSubmitting},
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            country: 'US',
            investmentGoals: 'Growth',
            riskTolerance: 'Medium',
            preferredIndustry: 'Technology',
        },
        mode: 'inBlur'
    })

    const onSubmit = async (data: SignUpFormData) => {
        try {

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <h1 className='form-title'>Sign Up & Personalize</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                {/*inputs*/}
                <InputField
                    name='FullName'
                    label='Full Name'
                    placeholder='Enter your full name'
                    register={register}
                    error={errors.fullName}
                    validation={true}
                />
                <InputField
                    name='Email'
                    label='Email'
                    placeholder='Enter your email'
                    register={register}
                    error={errors.email}
                    validation={true}
                />
                <InputField
                    name='Password'
                    label='Password'
                    placeholder='Enter your Password'
                    register={register}
                    error={errors.password}
                    validation={true}
                />

                {/*country*/}

                <CountrySelectField
                    name='Country'
                    label='country'
                    control={control}
                />
                {/*Select Fields*/}

                <SelectField
                    name='Investment Goal'
                    label='Investment Goal'
                    placeholder='Select your Investment goal'
                    options={INVESTMENT_GOALS}
                    control={control}
                    error={errors.investmentGoals}
                />
                <SelectField
                    name='Risk Tolerance'
                    label='Risk Tolerance'
                    placeholder='Select your Risk Tolerance'
                    options={RISK_TOLERANCE_OPTIONS}
                    control={control}
                    error={errors.riskTolerance}
                />
                <SelectField
                    name="Prefered Industry"
                    label='Prefered Industry'
                    placeholder='Select your Prefered Industry'
                    options={PREFERRED_INDUSTRIES}
                    control={control}
                    error={errors.preferredIndustry}
                />

                {/*submit Button*/}

                <Button type='submit' disabled={isSubmitting} className='yellow-btn w-full mt-5'>
                    {isSubmitting ? 'Signing Up...' : 'Start Your Investment Journey'}
                </Button>

                {/*footer*/}

                <FooterLink
                    text='already have an account ?'
                    linkText='Sign In'
                    href='/sign-in'
                />

            </form>
        </>
    )
}
export default signUp

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMask } from '@react-input/mask';
import { useTranslation } from 'react-i18next';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useStore } from '../../store';

import PassportUploadForm from './PassportUploadForm';
import Snackbar from '../Snackbar';

import { postAutoFinance } from '../../api';

const PhoneInput = React.forwardRef(({ onChange, onBlur, name, placeholder }, ref) => {
    const inputRef = useMask({ mask: '+996(___) __-__-__', replacement: { _: /\d/ } });
    return (
        <input
            type="text"
            ref={(e) => {
                ref(e);
                inputRef.current = e;
            }}
            name={name}
            placeholder={placeholder}
            className="p-5 rounded-md w-full"
            onChange={onChange}
            onBlur={onBlur}
        />
    );
});

const SubmitForm = () => {
    console.log('scroll');
    
    const [disableAgreementBtn, setDisableAgreementBtn] = useState(false)
    const [disablePublicBtn, setDisablePublicBtn] = useState(false)
    const [disableBtn, setDisableBtn] = useState(false)
    const detailform = useStore(state => state.detailform)
    const showSnackbar = useStore((state) => state.showSnackbar);
    const { t } = useTranslation();
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const show = useStore(state => state.snackbar)
    const photo1 = useStore(state => state.photo1)
    const photo2 = useStore(state => state.photo2)
    const photo3 = useStore(state => state.photo3)

    const regions = t('form.region', { returnObjects: true });
    
    useEffect(() => { 
    if (photo1 || photo2 || photo3) {
        const file = new File([photo1], 'passport-front.png', { type: 'image/png' });
        setValue('photo1', file);  
        const file2 = new File([photo2], 'passport-back.png', { type: 'image/png' });
        setValue('photo2', file2);  
        const file3 = new File([photo3], 'passport.png', { type: 'image/png' });
        setValue('photo3', file3);  
    }
}, [photo1, photo2, photo3, setValue]);
    
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: postAutoFinance,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['autofinanse'] });
            showSnackbar(true);
            reset();
        },
    });

    useEffect(() => {
        if(disableAgreementBtn && disablePublicBtn){
            setDisableBtn(true)
        }else{
            setDisableBtn(false)
        }
    }, [disableAgreementBtn, disablePublicBtn])

    const onSubmit = (data) => {
        const payload = {
            details: {
                name: data.name,
                phone: data.phone,
                region: data.region,
                ...detailform
            },
            photo1: data.photo1,
            photo2: data.photo2,
            photo3: data.photo3
        }
        
        mutation.mutate(payload);
        reset()
    };

    return (
        <div className="bg-gray py-10 border-y-2 border-yellow">
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col '>
                <div className="flex flex-col gap-4 lg:flex-row">
                    <div className='flex flex-col w-full lg:w-1/2'>
                        <div className='relative w-full flex justify-between items-center mb-10'>
                            <label className="text-lg font-medium text-green absolute bottom-full" htmlFor="name">{t("form.name.title")}</label>
                            <input
                                type="text"
                                placeholder={t("form.name.placeholder")}
                                name="name"
                                id="name"
                                className="p-5 rounded-md w-full mr-0"
                                {...register("name", { required: true, maxLength: 250 })}
                            />
                            {errors.name && <span className="text-red text-xs bottom-full absolute right-1 bg-opacity-80 translate-y-1/2 border-2 border-red bg-white p-1 rounded-md">Поле имя обязательна к заполнению и оно не должно превышать 250 символов</span>}
                        </div>
                        <div className='relative w-full flex justify-between items-center mb-10'>
                            <label className="text-lg font-medium text-green absolute bottom-full" htmlFor="phone">{t("form.phone.title")}</label>
                            <PhoneInput
                                name="phone"
                                placeholder={t("form.phone.placeholder")}
                                {...register("phone", {
                                    required: true,
                                    pattern: {
                                        value: /^\+996\(\d{3}\) \d{2}-\d{2}-\d{2}$/,
                                        message: "Введите номер телефона без +996"
                                    }
                                })}
                            />
                            {errors.phone && <span className="text-red text-xs bottom-full absolute right-1 bg-opacity-80 translate-y-1/2 border-2 border-red bg-white p-1 rounded-md">Введите корректный номер телефона</span>}
                        </div>
                        <div className='relative w-full flex justify-between items-center mb-5'>
                            <label className="text-lg font-medium text-green absolute bottom-full" htmlFor="region">Регион</label>
                            <select
                                name="region"
                                id="region"
                                className="p-5 rounded-md w-full bg-white text-black mr-0"
                                {...register("region", { required: true })}
                            >
                                {regions.map((region, idx) => (
                                    <option key={idx} value={region}>{region}</option>
                                ))}
                            </select>
                            {errors.region && <span className="text-red text-xs bottom-full absolute right-1 bg-opacity-80 translate-y-1/2 border-2 border-red bg-white p-1 rounded-md">Выберите регион!</span>}
                        </div>
                    </div>
                    <div className='w-full lg:w-1/2 relative'>
                        <label className="text-lg font-medium text-green absolute bottom-full" htmlFor="name">{t("carloans.photo")}</label>
                        <div className='flex relative'>
                        <PassportUploadForm label={"photo1"} />
                        <input name="photo1" id='photo1' {...register("photo1", { required: true })} className='w-0'/>
                        {errors.photo1 && <span className="text-red text-xs bottom-full absolute right-1 bg-opacity-80 translate-y-1/2 border-2 border-red bg-white p-1 rounded-md">Сделайте снимок паспорта!</span>}
                        </div>
                        <div className='flex relative'>
                        <PassportUploadForm label={"photo2"} />
                        <input name="photo2" id='photo2' {...register("photo2", { required: true })} className='w-0'/>
                        {errors.photo2 && <span className="text-red text-xs bottom-full absolute right-1 bg-opacity-80 translate-y-1/2 border-2 border-red bg-white p-1 rounded-md">Сделайте снимок паспорта!</span>}
                        </div>
                        <div className='flex relative'>
                        <PassportUploadForm label={"photo3"} />
                        <input name="photo3" id='photo3' {...register("photo3", { required: true })} className='w-0'/>
                        {errors.photo3 && <span className="text-red text-xs bottom-full absolute right-1 bg-opacity-80 translate-y-1/2 border-2 border-red bg-white p-1 rounded-md">Сделайте снимок паспорта!</span>}
                        </div>
                    </div>
                </div>
                <div className='text-center flex items-center justify-center mb-3'>
                    <input onClick={() => setDisableAgreementBtn(!disableAgreementBtn)} type='checkbox' id="agreement" name='agreement' className="form-checkbox h-5 w-5 focus:ring-offset-0 border-solid border-2 border-green checked:bg-yellow cursor-pointer appearance-none text-yellow rounded focus:ring-yellow focus:ring-2" />
                    <label htmlFor='agreement' className='ml-2 text-sm md:text-lg font-medium text-link border-b-2'>
                        {t('carloans.publicoffer.title1')}
                        </label>
                </div>
                <div className='text-center flex items-center justify-center'>
                    <input onClick={() => setDisablePublicBtn(!disablePublicBtn)} type='checkbox' id="public" name='public' className="form-checkbox h-5 w-5 focus:ring-offset-0 border-solid border-2 border-green checked:bg-yellow cursor-pointer appearance-none text-yellow rounded focus:ring-yellow focus:ring-2" />
                    <label htmlFor='public' className='ml-2 text-sm md:text-lg font-medium text-link border-b-2'>
                       {t('carloans.publicoffer.title2')}
                        </label>
                </div>
                <button disabled={!disableBtn} type="submit" className="disabled:opacity-35 p-2 capitalize rounded-md hover:opacity-65 transition-opacity bg-yellow text-black font-medium w-full md:w-1/3 mx-auto mt-5">{mutation.isPending ? 'Загрузка...' : t('submit')}</button>
                {mutation.isError && <span className="text-red text-center">Ошибка отправки формы!</span>}
                {show && <Snackbar />}
            </form>
        </div>
    );
}

export default SubmitForm;

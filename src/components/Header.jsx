import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { saveLanguage, getLanguage } from '../helper'
import { NavLink } from 'react-router-dom'


const Header = () => {
  const [show, setShow] = useState(false)
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const savedLanguage = getLanguage();
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);


  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    saveLanguage(lang);
  }
  return (
    <div className='container mx-auto flex justify-between items-center px-2 py-5'>
      <div className='hidden md:flex items-center gap-9'>

        <div className='logo fill-yellow'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2c0 0 0 0 0 0s0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5l0 35.4c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336l0-35.4c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4l0 3.4 0 5.7 0 26.3zm32 0l0-32 0-25.9c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5l0 35.4c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5l0 35.4c0 44.2-86 80-192 80S0 476.2 0 432l0-35.4c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z" />
          </svg>
        </div>

        <p className='text-2xl font-bold'>
          Кредитный калькулятор
        </p>
      </div>
        <div className='md:hidden w-12 fill-yellow'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2c0 0 0 0 0 0s0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5l0 35.4c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336l0-35.4c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4l0 3.4 0 5.7 0 26.3zm32 0l0-32 0-25.9c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5l0 35.4c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5l0 35.4c0 44.2-86 80-192 80S0 476.2 0 432l0-35.4c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z" />
          </svg>
        </div>
      <div className='flex items-center'>
        <NavLink className={({ isActive }) =>
          isActive ? "text-lg  text-yellow uppercase px-2 border-r-2" : "text-md  text-link uppercase px-2 border-r-2"
        } to={'/call_back'}>Заказать обратный звонок</NavLink>
        <NavLink className={({ isActive }) =>
          isActive ? "text-lg  text-yellow uppercase px-2 border-r-2" : "text-md  text-link uppercase px-2 border-r-2"
        } to={'/credit_calculator'}>Калькулятор</NavLink>
        <div className='lang flex align-middle pl-2 gap-2 relative' onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
          <p className='md:hidden uppercase text-link'>{t("abr")}</p>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 22.75C18.3848 22.75 22.75 18.3848 22.75 13C22.75 7.61522 18.3848 3.25 13 3.25C7.61522 3.25 3.25 7.61522 3.25 13C3.25 18.3848 7.61522 22.75 13 22.75Z" stroke="#7893B0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3.80859 9.75H22.1914" stroke="#7893B0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3.80859 16.25H22.1914" stroke="#7893B0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path><path d="M13 22.4865C15.2437 22.4865 17.0625 18.2395 17.0625 13.0006C17.0625 7.76165 15.2437 3.51465 13 3.51465C10.7563 3.51465 8.9375 7.76165 8.9375 13.0006C8.9375 18.2395 10.7563 22.4865 13 22.4865Z" stroke="#7893B0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          <p className='hidden md:block uppercase text-link'>{t("lang")}</p>
          {
            show && <div className='absolute right-0 top-full p-5 rounded-xl border-link border-solid border-2 bg-white'>
              <p className='uppercase mb-3 cursor-pointer text-link' onClick={() => changeLanguage('kg')}>Кыргызча</p>
              <p className='uppercase cursor-pointer text-link' onClick={() => changeLanguage('ru')}>Русский</p>
            </div>
          }
        </div>
      </div>

    </div>
  )
}

export default Header
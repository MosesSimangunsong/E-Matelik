import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                primary: {
                    500: '#4F8A3F',
                    600: '#3F7332',
                    700: '#315B27',
                },
                secondary: {
                    50: '#EEF7FB',
                    200: '#BFDBEA',
                    500: '#3D8BBA',
                    600: '#2F739D',
                    700: '#255B7D',
                },
                accent: {
                    500: '#A8743B',
                    600: '#8C6030',
                },
                neutral: {
                    50: '#F8F7F2',
                    100: '#F1EFE8',
                    200: '#E3E0D7',
                    300: '#CFC9BC',
                    500: '#7B766B',
                    700: '#4D4A43',
                    900: '#25241F',
                },
                success: '#3F8C5A',
                warning: '#D39A2C',
                danger: '#C94B4B',
                info: '#3D8BBA',
            },
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
            },
            borderRadius: {
                soft: '10px',
                card: '16px',
                modal: '20px',
            },
            boxShadow: {
                soft: '0 16px 40px rgba(37, 36, 31, 0.08)',
                panel: '0 10px 30px rgba(61, 139, 186, 0.08)',
            },
        },
    },

    plugins: [forms],
};

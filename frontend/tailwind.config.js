/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        check_bg: "hsl(var(--Check-Background))",
        b_blue: "hsl(var(--Bright-Blue))",
        vl_gray: "hsl(var(--very-light-gray))",
        vlg_blue: "hsl(var(--Very-Light-Grayish-Blue))",
        lg_blue: "hsl(var(--Light-Grayish-Blue))",
        dg_blue: "hsl(var(--Dark-Grayish-Blue))",
        vdg_blue: "hsl(var(--Very-Dark-Grayish-Blue))",
        vdark_b: "hsl(var(--Very-Dark-Blue))",
        vdark_db: "hsl(var(--Very-Dark-Desaturated-Blue))",
        lg_blue2: "hsl(var(--Light-Grayish-Blue2))",
        lg_blue3: "hsl(var(--Light-Grayish-Blue3))",
        dg_blue2: "hsl(var(--Dark-Grayish-Blue2))",
        vdg_blue2: "hsl(var(--Very-Dark-Grayish-Blue2))",
        vdg_blue3: "hsl(var(--Very-Dark-Grayish-Blue3))",
      },
      backgroundImage: {
        // imgd_d: "url(../../bg-desktop-light.jpg)",
        // imgd_dd: "url(../../bg-desktop-dark.jpg)",
        // imgm_l: "url(../../bg-mobile-light.jpg)",
        // imgm_d: "url(../../bg-mobile-dark.jpg)",
        imgd_d: "url(/src/public/bg-desktop-light.jpg)",
        imgd_dd: "url(/src/public/bg-desktop-dark.jpg)",
        imgm_l: "url(/src/public/bg-mobile-light.jpg)",
        imgm_d: "url(/src/public/bg-mobile-dark.jpg)",
      },
    },
  },
  plugins: [],
};

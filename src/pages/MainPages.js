import React from 'react'
import FormComp from "../components/FormComp";
import GalleryComp from "../components/GalleryComp";
import HeroComp from "../components/HeroComp";
import NavbarComp from "../components/NavbarComp";
import FooterComp from "../components/FooterComp";

const MainPages = () => {
  return (
    <div>
    <NavbarComp />
    <HeroComp />
    <GalleryComp />
    <FormComp />
    <FooterComp />
    </div>
  )
}

export default MainPages
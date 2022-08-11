import "../styles/heroImage.scss";

import { useEffect, useState } from "react";

import mathRandom from "../util/mathRandom";

type Props = {};
const placeHolder = () => {
  return (
    <div className="placeholder">
      <div className="loading one"></div>
      <div className="loading two"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};
function HeroImage({}: Props) {
  const [image, setImage] = useState({
    name: "",
    title: "",
    url: "",
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchPages() {
      console.log("fetch");
      const response = await fetch("https://api.artic.edu/api/v1/artworks");
      const page = await response.json();
      return page.pagination.total_pages;
    }

    async function getRandomImage() {
      const pageNum = await fetchPages().then((item) => {
        return item;
      });

      const randomNumber = await mathRandom(pageNum);
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${randomNumber}`
      );
      const result = await response.json();
      return {
        name: result.data[0].artist_title,
        title: result.data[0].title,
        image: `https://www.artic.edu/iiif/2/${result.data[0].image_id}/full/843,/0/default.jpg`,
      };
    }

    getRandomImage().then((item) => {
      setLoading(false);
      setImage({
        ...image,
        name: item.name,
        title: item.title,
        url: item.image,
      });
    });
  }, []);

  return (
    <section className="hero-image">
      {placeHolder()}
      {/* {loading ? (
        placeHolder()
      ) : (
        <>
          <img src={image.url} alt={image.title} />
          <h2>{image.title}</h2>
          <h3>By {image.name}</h3>
        </>
      )} */}
    </section>
  );
}

export default HeroImage;

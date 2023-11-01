import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";


it("doesn't crash", function () {
  render(<Carousel
    photos={TEST_IMAGES}
    title="images for testing"
  />);
});


it("matches snapshot", function () {
  const { container } = render(<Carousel
    photos={TEST_IMAGES}
    title="images for testing"
  />);
  expect(container).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});


it("works when you click on the left arrow", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move backwards in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the third image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).toBeInTheDocument();
});

// TODO: update when you change hidden to css
it("left arrow is missing when you’re on the first image", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the left arrow to be hidden
  expect(
    container.querySelector('i[class="bi bi-arrow-left-circle"]')
  ).not.toBeInTheDocument();
});

it("right arrow is missing when you’re on the last image", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the right arrow to be hidden
  const rightArrow = container.querySelector('i[class="bi bi-arrow-right-circle"]');
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);
  expect(
    container.querySelector('i[class="bi bi-arrow-right-circle"]')
  ).not.toBeInTheDocument();
});

it("left and right arrow is missing when only one image", function () {
  const { container } = render(
    <Carousel
      photos={[TEST_IMAGES[0]]}
      title="images for testing"
    />
  );
  // expect the both arrows to be hidden
  expect(
    container.querySelector('i[class="bi bi-arrow-left-circle"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('i[class="bi bi-arrow-right-circle"]')
  ).not.toBeInTheDocument();
});
import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

export default class CustomCarousel extends Component {
  render() {
    return (
      <Carousel>
        {this.props.images.map(image => {
          return (
            <Carousel.Item key={image.id}>
              <img className="d-block w-100" src={image.src} alt={image.title} />
              <Carousel.Caption>
                <p>{image.title}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  }
}

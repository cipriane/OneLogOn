import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import s from './NoMatch.css';
import Layout from 'common/Layout/Layout';
import FullScreenLayout from 'common/FullScreenLayout/FullScreenLayout';
import Form from 'react-bootstrap/Form';
import MainFormLayout from 'common/MainFormLayout/MainFormLayout';
import FancyButton from 'common/FancyButton/FancyButton';



export default class NoMatch extends Component {

	handleSubmit = async (event) => {
		this.props.history.push('/');
	};


	render() {
		return (
			<Layout>
				<FullScreenLayout>
					<Form onSubmit={this.handleSubmit}>
						<MainFormLayout>
							<Form.Group >
								<h1 className={s.padding}>
									Page Not Found
								</h1>
								<FancyButton 
									label="Go Home"
									type = "submit"
								/>
							</Form.Group >
						</MainFormLayout>
					</Form>
				</FullScreenLayout>
			</Layout>
		);
	}
}

import React, { useEffect } from 'react'
import Orderdatatable from './Orderdatatable'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';
import Header from '../../common/Header';

// redux
import { useDispatch } from 'react-redux';
import { commonActions } from '../../redux/reducers/Common';

function OrderView() {

	const dispatch = useDispatch();


	useEffect(() => {
		dispatch(commonActions.setPageTitle('Order View'));
	}, []);


	return (
		<>
			<div>
				<div className="data_table-head">
					<Grid container spacing={2}>
						<Grid md={7}>
							<div className="order_sum-row">
								<div><Typography variant="h3" className="title">Orders</Typography></div>
								<div className="order_sumr_block">
									<List>
										<ListItem>
											<span className="title">Sales Period Total</span>
											<label className="value">$24,793.01</label>
										</ListItem>
										<ListItem>
											<span className="title">Sales Range</span>
											<label className="date">10/21/21 to 10/30/21</label>
										</ListItem>
									</List>
								</div>
							</div>
						</Grid>
						<Grid md={5}>
							<div className="btn_parent-auto">
								<List className="btn_group-block">
									<ListItem>
										<Button className="btn_cro"><Link to="/order-entry">Create new order</Link></Button>
									</ListItem>
									<ListItem>
										<Button className="btn_nc">Create new customer</Button>
									</ListItem>
								</List>
							</div>
						</Grid>
					</Grid>
					<div className="container-fluid">
						<Orderdatatable />
					</div>
				</div>
			</div>
		</>
	)
}

export default OrderView

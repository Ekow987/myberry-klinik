import { useEffect, useState,useContext } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
// import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import { AppContext } from "../../../components/Context/AppContext"
// import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = (props) => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    const [statistics, setStatistics] = useState()
	const { getStatistics } = useContext(AppContext)

	useEffect(() => {
		getStatistics().then(response => {
			response.data ? setStatistics(response.data) : setStatistics([])
		})
	}, [1])

    return  statistics ? (
        <>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <EarningCard
                             	title="Total Issues"
                                 text={
                                     Number(statistics[0]?.resolved) +
                                     Number(statistics[0]?.unresolved)
                                 }
                            isLoading={isLoading} />
                        </Grid>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <TotalOrderLineChartCard 
                            title="Resolved"
                            text={statistics[0]?.resolved}
                            isLoading={isLoading} />
                        </Grid>
                        <Grid item lg={4} md={12} sm={12} xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item sm={6} xs={12} md={6} lg={12}>
                                    <TotalIncomeDarkCard 
                                    title="Pending Issues"
                                    text={Number(statistics[0]?.unresolved)}
                                    isLoading={isLoading} />
                                </Grid>
                                <Grid item sm={6} xs={12} md={6} lg={12}>
                                    <TotalIncomeLightCard 
                                    title="Pending Issues"
                                    text={Number(statistics[0]?.unresolved)}
                                    isLoading={isLoading} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={8}>
                            {/* <TotalGrowthBarChart isLoading={isLoading} /> */}
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {/* <PopularCard isLoading={isLoading} /> */}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    ): (
        <div className="spinner-grow" role="status">
			<span className="visually-hidden">Loading...</span>
		</div>
      )
}

export default Dashboard;

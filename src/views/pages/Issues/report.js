import React from "react";
import IssuesStatistics from '../../reportdashboard/dashboard/Default/index';
import ReportForms from "./reportForms";
import ReportList from "./ReportList"
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
export default function Report(){

    return(
        <>
        <IssuesStatistics/>
         
        <Container className='report'>
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                            <ReportForms/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

               
        <Container className="list">
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                            <ReportList/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        
        
       


        </>
    );
}
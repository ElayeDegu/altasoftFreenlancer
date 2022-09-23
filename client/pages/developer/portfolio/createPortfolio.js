import { Card, Col, Row } from 'antd';
import React from 'react';
import DeveloperRoute from '../../../components/routes/DeveloperRoutes';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Meta } = Card;

const createPortfolio = () => {
    return (
        <DeveloperRoute>
            <h1 className="jumbotron text-center square">Portfolio</h1>
            <div className="site-card-wrapper">
                <Row gutter={16}>
                    <Col span={8}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                            actions={[
                                <EditOutlined key="edit" />,
                                <DeleteOutlined key="delete" />,
                            ]}
                        >
                            <Meta title="Project One" description="Proof of Concept Project" />

                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                            actions={[
                                <EditOutlined key="edit" />,
                                <DeleteOutlined key="delete" />,
                            ]}
                        >
                            <Meta title="Project Two" description="Altasoft Freelancer Projects" />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                            actions={[
                                <EditOutlined key="edit" />,
                                <DeleteOutlined key="delete" />,
                            ]}
                        >
                            <Meta title="Project Three" description="Coming Soon Projects" />
                        </Card>
                    </Col>
                </Row>
            </div>

        </DeveloperRoute>

    )
};

export default createPortfolio;
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap'
import TopNav from '../../components/TopNav'
import ExportFtr from './ExportFtr'
import useAuth from "../../hooks/useAuth";
import axios from 'axios'
import { FAST_HOST, GET_INFO_STORE } from '../../api/apiURL'

const getCookie = (name) => {
    const strCookie = document.cookie;
    const arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (arr[0] === name) return arr[1];
    }
    return "";
}

const Analysis = () => {
    const HOST = "http://localhost:8000"
    const { auth } = useAuth()
	// const storeAccount = auth.account
    const storeAccount = getCookie("account")
	const [storeName, setStoreName] = useState('')

    const checkStyle = {
        width: '22px',
        height: '22px',
        borderRadius: '50%'

    }

    const [timeInterval, setTimeInterval] = useState({
        start: null,
        end: null
    })

    useEffect(() => {
		axios.post(GET_INFO_STORE,
			JSON.stringify({ account: storeAccount }),
			{
				headers: { 'Content-Type': 'application/json' },
			}
		)
			.then(response => {
				setStoreName(response.data.msg.Storename)
			})
			.catch((error) => console.log(error))
	}, []);

    const getReport = () => {
        axios({
            url: `${FAST_HOST}/finances/${storeName}`,
            method: 'POST',
            params: timeInterval,
            responseType: 'blob', // important
        }).then((response) => {
            const url = window.URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', "orderdata.xlsx");
            document.body.appendChild(link);
            link.click();
        });

    }
    // console.log(timeInterval)

    return (
        <div>
            <TopNav NavStyle={"onlyGoback"} />

            <Container>
                <Form className='mt-3' >
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label style={{ fontSize: '20px' }}>??????????????????????????????</Form.Label>
                        <Stack direction="horizontal">
                            <Form.Select
                                onChange={(e) => setTimeInterval((prev) => ({ ...prev, start:e.target.value }))}
                            >
                                <option value={null}>?????????</option>
                                <option value={'20220101'}>2022 ??? 1 ???</option>
                                <option value={'20220201'}>2022 ??? 2 ???</option>
                                <option value={'20220301'}>2022 ??? 3 ???</option>
                                <option value={'20220401'}>2022 ??? 4 ???</option>
                                <option value={'20220501'}>2022 ??? 5 ???</option>
                                <option value={'20220601'}>2022 ??? 6 ???</option>
                                <option value={'20220701'}>2022 ??? 7 ???</option>
                                <option value={'20220801'}>2022 ??? 8 ???</option>
                                <option value={'20220901'}>2022 ??? 9 ???</option>
                                <option value={'20221001'}>2022 ??? 10 ???</option>
                                <option value={'20221101'}>2022 ??? 11 ???</option>
                                <option value={'20221201'}>2022 ??? 12 ???</option>
                            </Form.Select>
                            &nbsp;&nbsp;&nbsp;???&nbsp;&nbsp;&nbsp;
                            <Form.Select 
                                onChange={(e) => setTimeInterval((prev) => ({ ...prev, end:e.target.value }))}
                            >
                                <option value={null}>?????????</option>
                                <option value={'20220131'}>2022 ??? 1 ???</option>
                                <option value={'20220231'}>2022 ??? 2 ???</option>
                                <option value={'20220331'}>2022 ??? 3 ???</option>
                                <option value={'20220431'}>2022 ??? 4 ???</option>
                                <option value={'20220531'}>2022 ??? 5 ???</option>
                                <option value={'20220631'}>2022 ??? 6 ???</option>
                                <option value={'20220731'}>2022 ??? 7 ???</option>
                                <option value={'20220831'}>2022 ??? 8 ???</option>
                                <option value={'20220931'}>2022 ??? 9 ???</option>
                                <option value={'20221031'}>2022 ??? 10 ???</option>
                                <option value={'20221131'}>2022 ??? 11 ???</option>
                                <option value={'20221231'}>2022 ??? 12 ???</option>
                            </Form.Select>
                        </Stack>
                    </Form.Group>

                    <Form.Group className="mb-2" id="formGridCheckbox">
                        <Form.Label style={{ fontSize: '20px' }}>??????????????????????????????</Form.Label>
                        <Row className='mb-3'>
                            <Col xs={5}>
                                <Form.Check type="checkbox" label="?????????" />
                            </Col>
                            <Col>
                                <Form.Check type="checkbox" label="????????????" />
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col xs={5}>
                                <Form.Check type="checkbox" label="???????????????" />
                            </Col>
                            <Col>
                                <Form.Check type="checkbox" label="????????????" />
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col xs={5}>
                                <Form.Check type="checkbox" label="??????????????????" />
                            </Col>
                            <Col>
                                <Form.Check type="checkbox" label="??????????????????" />
                            </Col>
                        </Row>
                    </Form.Group>

                    {/* <Form.Group className='mb-3' id="formGridCheckbox">
                        <Form.Label style={{ fontSize: '20px' }}>??????????????????????????????</Form.Label>
                        <Stack gap={2}>
                            <Form.Check type="checkbox" label="?????????" />
                            <Form.Check type="checkbox" label="????????????" />
                            <Form.Check type="checkbox" label="???????????????" />
                            <Form.Check type="checkbox" label="??????????????????" />
                            <Form.Check type="checkbox" label="??????????????????" />
                            <Form.Check type="checkbox" label="????????????" />

                        </Stack>

                    </Form.Group> */}

                    {/* <Stack>
                        <Button
                            style={{ backgroundColor: 'rgb(62, 158, 246)', border: 'none', height: '40px' }}
                        >
                            ??????
                        </Button>
                    </Stack> */}

                </Form>
            </Container>
            <ExportFtr export={() => getReport()} />
        </div>
    )
}

export default Analysis
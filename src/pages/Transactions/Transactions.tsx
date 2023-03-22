import React, { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../../Store/UserContext";
import API from "../../helpers/API";
import {
  Row,
  Col,
  Button,
  Alert,
  Dropdown,
  Modal,
  Table,
} from "react-bootstrap";
import searchImg from "../../images/search.svg";
import profileDropdownImg from "../../images/profileDropdownImg.svg";
import arrowLeft from "../../images/arrowLeft.svg";
import arrowRight from "../../images/arrowRight.svg";
import { formatCurrency, formatDate } from "../../helpers/utils";
import cancel from "../../images/cancelBlack.svg";
import loader from "../../images/loader.gif";
import { useReactToPrint } from "react-to-print";
import billerFullPrimary from "../../images/billerFullPrimary.svg";

const Dashboard = () => {
  const { user, userDispatch } = useContext(UserContext);

  function onFail(error: string) {
    alert("failed!");
  }

  const transactionTypes = [
    "ATM Card Funding",
    "Direct Bank Transfer",
    "Purchase Reversal",
    "Data Purchase",
    "Airtime Purchase",
    "Cable TV Subscription",
    "Electricity Bill Payment",
    "Commission Payment",
    "Admin Payment",
  ];

  const transactionStatus = [
    "Paying",
    "Successful",
    "Queued ",
    "Processing",
    "Reversed",
    "Failed",
  ];
  const transactionClassNames = [
    "paying",
    "successful",
    "paying ",
    "processing",
    "processing",
    "failed",
  ];
  const transactionDeviceNumberName = [
    "",
    "",
    "",
    "Phone Number",
    "Phone Number",
    "Smartcard Number",
    "Meter Number",
    "",
    "",
  ];

  const transactionCol2Name = [
    "",
    "",
    "",
    "Network",
    "Network",
    "TV Provider",
    "Disco",
    "",
    "",
  ];
  const transactionCol2NameMetaValue = [
    "",
    "",
    "",
    "network",
    "network",
    "tvProvider",
    "discoName",
    "",
    "",
  ];

  const transactionCol2Type = [
    "",
    "",
    "",
    "Data Plan",
    "Airtime Value",
    "Tarrif",
    "Plan",
    "",
    "",
  ];
  const transactionCol2TypeMetaValue = [
    "",
    "",
    "",
    "dataPlan",
    "airtimeValue",
    "tarrifPlan",
    "packageType",
    "",
    "",
  ];

  const paymentMethod = [
    "ATM Payment",
    "Wallet Payment",
    "Monnify Payment",
    "Admin Payment",
  ];

  const [showModal, setShowModal] = useState(false);
  const [transaction, setTransaction] = useState({} as any);

  function hideModal() {
    setShowModal(false);
  }

  function showDetails(tranc: any) {
    setShowModal(true);
    setTransaction(tranc);
  }

  useEffect(() => {
    getData(1);
  }, []);

  function getData(pageNo: number) {
    setDataLoaded(false);
    API(
      "get",
      "transactions",
      {
        page: pageNo,
        search: search,
        transactionType: searchTransactionType,
        dateFrom: dateFrom,
        dateTo: dateTo,
        pageSize: pageSize,
      },
      onLoad,
      onFail,
      user.data && user.token
    );
  }

  const [dataLoaded, setDataLoaded] = useState(false);
  const [data, setData] = useState<any>([]);

  function onLoad(data: any) {
    setData(data.data);
    setDataLoaded(true);
  }

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchTransactionType, setSearchTransactionType] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [pageSize, setPageSize] = useState("");

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => printRef.current!,
  });

  return (
    <div className="p-48-16 w-100">
      <Modal
        centered
        show={showModal}
        onHide={hideModal}
        backdrop="static"
        keyboard={false}
      >
        {transaction && (
          <div className="ms-4 me-4 mb-2 mt-4 ">
            <div className="ms-4 me-4 mb-4 mt-3 ">
              <img className="nav-cancel  " onClick={hideModal} src={cancel} />
            </div>
            <div className="m-3" ref={printRef}>
              <div className="pt-5">
                <p>
                  <img src={billerFullPrimary}></img>
                </p>
                <label className="text-p t-26-18 mb-3">
                  {transactionTypes[transaction.transactionType]} Receipt
                </label>
              </div>
              <div>
                <Row>
                  {/* if transaction is electric */}
                  {transaction.transactionType === 6 && (
                    <Col xs="12" className="mb-3 ">
                      <b>
                        {transaction.metaData &&
                          JSON.parse(transaction.metaData)["token"]}
                      </b>
                    </Col>
                  )}
                  <Col xs="6">
                    <p className="transaction-text-light">
                      {transactionDeviceNumberName[transaction.transactionType]}
                    </p>
                    <p className="transaction-text-bold">
                      {transaction.deviceNumber}
                    </p>

                    <p className="transaction-text-light">Payment Method</p>
                    <p className="transaction-text-bold">
                      {paymentMethod[transaction.paymentMethod]}
                    </p>

                    <p className="transaction-text-light">Amount</p>
                    <p className="transaction-text-bold">
                      ₦{formatCurrency(transaction.amount)}
                    </p>

                    <p className="transaction-text-light">Status</p>

                    <p className="transaction-text-bold">
                      <label
                        className={transactionClassNames[transaction.status]}
                      >
                        <label> {transactionStatus[transaction.status]}</label>
                      </label>
                    </p>
                  </Col>
                  <Col xs="6">
                    <p className="transaction-text-light">
                      {transactionCol2Name[transaction.transactionType]}
                    </p>
                    <p className="transaction-text-bold">
                      {transaction.metaData &&
                        JSON.parse(transaction.metaData)[
                          transactionCol2NameMetaValue[
                            transaction.transactionType
                          ]
                        ]}
                    </p>

                    <p className="transaction-text-light">
                      {transactionCol2Type[transaction.transactionType]}
                    </p>
                    <p className="transaction-text-bold">
                      {transaction.metaData &&
                        JSON.parse(transaction.metaData)[
                          transactionCol2TypeMetaValue[
                            transaction.transactionType
                          ]
                        ]}
                    </p>

                    <p className="transaction-text-light">Balance B/A</p>
                    <p className="transaction-text-bold">
                      ₦{formatCurrency(transaction.balanceBefore)}/₦
                      {formatCurrency(transaction.balanceAfter)}
                    </p>

                    <p className="transaction-text-light">Date & Time</p>
                    <p className="transaction-text-bold">
                      {formatDate(transaction.created_at)}
                    </p>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="text-center pb-4 pt-4 ">
              <Button
                className="button-white ps-4 pe-4 t-16 me-2 ms-2"
                onClick={handlePrint}
              >
                Share
              </Button>
              <Button
                className="button ps-4 pe-4 t-16  me-2 ms-2"
                onClick={handlePrint}
              >
                Download
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <p className="text-p t-26">Transactions</p>
      <div>
        <Row>
          <Col md="6">
            <label className="pt-3">View your transaction history</label>
          </Col>
          <Col>
            <form
              onSubmit={() => getData(1)}
              className=" auth-form mb-3 text-start"
            >
              <Modal
                centered
                show={showFilterModal}
                onHide={() => setShowFilterModal(false)}
                backdrop="static"
                keyboard={false}
              >
                {transaction && (
                  <div className="ms-4 me-4 mb-2 mt-4 ">
                    <div className="ms-4 me-4 mb-4 mt-4 ">
                      <img
                        className="nav-cancel  "
                        onClick={() => setShowFilterModal(false)}
                        src={cancel}
                      />
                    </div>
                    <div className="pt-5">
                      <label className="text-p t-26-18 mb-3">Filter </label>
                    </div>
                    <div>
                      <Row>
                        <Col xs="6">
                          <p className="transaction-text-light">Date From</p>
                          <input
                            className="form-control mb-4 "
                            value={dateFrom}
                            onChange={(e) => {
                              setDateFrom(e.target.value);
                            }}
                            type="date"
                          />

                          <p className="transaction-text-light">
                            Transaction Type
                          </p>
                          <select
                            className="form-control"
                            value={searchTransactionType}
                            onChange={(e) => {
                              setSearchTransactionType(e.target.value);
                            }}
                          >
                            <option value="">All Transactions</option>
                            {transactionTypes.map((transaction, index) => {
                              return (
                                <option value={index} key={"key" + index}>
                                  {transaction}
                                </option>
                              );
                            })}
                          </select>
                        </Col>
                        <Col xs="6">
                          <p className="transaction-text-light">Date To</p>
                          <input
                            className="form-control mb-4 "
                            value={dateTo}
                            onChange={(e) => {
                              setDateTo(e.target.value);
                            }}
                            type="date"
                          />

                          <p className="transaction-text-light">Item Size </p>
                          <p className="transaction-text-bold">
                            <select
                              className="form-control"
                              value={pageSize}
                              onChange={(e) => {
                                setPageSize(e.target.value);
                              }}
                            >
                              <option value="">15 per page</option>
                              <option value="30">30 per page</option>
                              <option value="50">50 per page</option>{" "}
                            </select>
                          </p>
                        </Col>
                      </Row>
                    </div>
                    <div className="text-center pb-4 pt-4 ">
                      <Button
                        className="button ps-4 pe-4 t-16  me-2 ms-2"
                        onClick={() => setShowFilterModal(false)}
                      >
                        Done
                      </Button>
                    </div>
                  </div>
                )}
              </Modal>

              <div>
                <input
                  className="form-input form-control ps-5  mb-2"
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  placeholder="Search"
                />
                <div className="d-flex justify-content-start ">
                  <img
                    src={searchImg}
                    className="search-btn "
                    onClick={() => getData(1)}
                  />
                </div>
              </div>
            </form>
          </Col>

          <Col>
            <div>
              <input
                className="form-input form-control   mb-2"
                type="text"
                value="Filter"
                disabled
              />
              <div className="d-flex justify-content-end me-4 ">
                <img
                  src={profileDropdownImg}
                  className="search-btn "
                  onClick={() => setShowFilterModal(true)}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="bg-white p-4">
        {!dataLoaded ? (
          <div className="vertical-wrapper text-center pt-5 pb-5 w-100 ">
            <div className=" w-100 vertical-column">
              <label>
                <img width="80" src={loader} />
              </label>
            </div>
          </div>
        ) : (
          <div>
            <Table responsive hover className="table">
              <thead>
                <tr>
                  <th data-priority="1">Transaction Type</th>
                  <th data-priority="3">Amount</th>
                  <th data-priority="3">Status</th>
                  <th data-priority="1">Payment Method</th>
                  <th data-priority="6">Date and Time</th>
                </tr>
              </thead>
              <tbody className="border ">
                {data.data.map((data: any, index: React.Key) => {
                  return (
                    <tr className="table-row" key={index}>
                      <td>{transactionTypes[data.transactionType]}</td>
                      <td>₦{formatCurrency(data.amount)}</td>
                      <td
                        className={
                          "text-center " + transactionClassNames[data.status]
                        }
                      >
                        <label>{transactionStatus[data.status]}</label>
                      </td>
                      <td className="text-center">
                        <label>{paymentMethod[data.paymentMethod]}</label>
                      </td>
                      <td>{formatDate(data.created_at)}</td>
                      <td>
                        <img
                          src={arrowRight}
                          onClick={() => {
                            showDetails(data);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div>
              <div className="d-flex justify-content-center">
                <div>
                  <img
                    src={arrowLeft}
                    onClick={() => {
                      getData(data.current_page - 1);
                    }}
                  />
                  <label className="me-3 ms-3">
                    {data.current_page} of {data.last_page}
                  </label>
                  <img
                    src={arrowRight}
                    onClick={() => {
                      getData(data.current_page + 1);
                    }}
                  />
                </div>
              </div>
              {/* <Row className="ml-1 mt-2 ">
                                <Pagination className="pagination-sm">
                                    <PaginationItem disabled={formData.current_page > 1 ? false : true}>
                                        <PaginationLink
                                            first
                                            onClick={() => {
                                                navigateToPage(formData.current_page - 1);
                                            }}
                                        />
                                    </PaginationItem>
                                    {formData.current_page - 5 > 0 && (
                                        <PaginationItem
                                            onClick={() => {
                                                navigateToPage(formData.current_page - 5);
                                            }}
                                        >
                                            <PaginationLink>{formData.current_page - 5}</PaginationLink>
                                        </PaginationItem>
                                    )}

                                    <PaginationItem active>
                                        <PaginationLink>{formData.current_page}</PaginationLink>
                                    </PaginationItem>

                                    {formData.last_page >= formData.current_page + 5 && (
                                        <PaginationItem
                                            onClick={() => {
                                                navigateToPage(formData.current_page + 5);
                                            }}
                                        >
                                            <PaginationLink>{formData.current_page + 5}</PaginationLink>
                                        </PaginationItem>
                                    )}

                                    <PaginationItem
                                        disabled={formData.current_page === formData.last_page ? true : false}
                                    >
                                        <PaginationLink
                                            onClick={() => {
                                                navigateToPage(formData.current_page + 1);
                                            }}
                                            last
                                        />
                                    </PaginationItem>
                                </Pagination>
                            </Row> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

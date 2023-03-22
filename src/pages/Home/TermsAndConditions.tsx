import React, { useContext, useEffect } from 'react';
import { Button, Carousel, Col, Row } from 'react-bootstrap';
import billerFullPrimary from '../../images/billerFullPrimary.svg';
import TopBar from '../../components/TopBar';
import FooterBar from '../../components/FooterBar';

import { Link } from 'react-router-dom';
import API from '../../helpers/API';

const PrivacyPolicy = () => {
    document.title = 'Terms and Conditions - Biller';

    return (
        <React.Fragment>
            <TopBar setNavCollapse={false} />

            <h1 className="m-3 text-center text-dark">Biller Terms and Conditions </h1>

            <Row className="justify-content-center">
                <Col xs="12" md="8">
                    <h4>Introduction</h4>
                    <p>
                        This Website Terms and Conditions (“Terms”) contained herein on this webpage is a legal
                        agreement between you, as a prospective user of Biller and shall govern your access to and use
                        of Biller services which include all pages within Biller website, mobile applications and other
                        products and services (collectively referred to as the “Services”). By signing up for an account
                        on Biller via our websites and/or services, you are deemed a user and agree to these Biller
                        Terms and Conditions (“Terms”). You must not use any of the Services, if you have any objection
                        to any of these Terms.
                    </p>

                    <h4>Age Restriction</h4>
                    <p>
                        Our website and services are not directed to children under 18. You are allowed to use the
                        Services if you are an adult. We do not knowingly transact or provide any service to children
                        under 18.{' '}
                    </p>

                    <h4>Representation and Warranties</h4>
                    <p>You represent and warrant to Biller that:</p>
                    <ul>
                        <li>
                            You have full power and authority to enter into, execute, deliver and perform this Agreement
                            for your personal user or business/company;
                        </li>
                        <li>
                            you are duly organised, authorised and in good standing under the laws of the Federal
                            Republic of Nigeria or any state, region or country of your organisation and are duly
                            authorised to do business in all other states, regions or countries in which your business
                            operates.
                        </li>
                    </ul>

                    <h4>Intellectual Property</h4>
                    <p>
                        We do not grant any right or license to any Biller intellectual property rights by implication,
                        estoppel or otherwise other than those expressly mentioned in this Agreement.
                    </p>

                    <h4>Data Compliance</h4>
                    <p>
                        You agree to comply with all data privacy and security requirements of the Payment Card Industry
                        Data Security Standard (PCI DSS Requirements”) and under any applicable law or regulation that
                        may be in force, enacted or adopted regarding confidentiality, your access, use, storage and
                        disclosure of user information. Information on the PCI DSS can be found on the PCI Council’s
                        website. It is your responsibility to comply with these standards. Our payment gateway is
                        responsible for the security and protection of Card Holder Data (CHD) processed through the
                        Services. You hereby grant Biller a perpetual, irrevocable, sub-licensable, assignable,
                        worldwide, royalty-free license to use, reproduce, electronically distribute, and display your
                        data for the following purposes:
                    </p>
                    <ol>
                        <li>Providing and improving our services</li>
                        <li>
                            Internal usage, including but not limited to, data analytics and metrics so long as
                            individual customer data has been anonymized and aggregated with other customer data;{' '}
                        </li>
                        <li>
                            Complying with applicable legal requirements and assisting law enforcement agencies by
                            responding to requests for the disclosure of information in accordance with local laws; and{' '}
                        </li>
                        <li>Any other purpose for which consent has been provided by your customer.</li>
                    </ol>

                    <h4>License to Use Our Services</h4>
                    <p>
                        We grant you a non-assignable, non-exclusive and revocable license to use the Services permitted
                        by these terms. This license grant includes all updates, upgrades, new versions and replacement
                        software for you to use in connection with our services. If you do not comply with the
                        documentation and any other requirements provided by Biller, then you will be liable for all
                        resulting damages suffered by you, Biller and third parties. Unless otherwise provided by
                        applicable law, you agree not to alter, re-design, reproduce, adapt, display, distribute,
                        translate, disassemble, reverse engineer, or otherwise attempt to create any source code that is
                        derived from the software. Upon expiration or termination of this Agreement, you will
                        immediately cease all use of any Software.
                    </p>

                    <h4>Publicity</h4>
                    <p>
                        You hereby grant Biller permissions to use your name and logo in our marketing materials
                        including, but not limited to use on our website, in customer listings, in interviews and in
                        press releases. Such publicity does not imply an endorsement for your products and services.{' '}
                    </p>

                    <h4>Know Your Customer</h4>
                    <p>
                        You agree that, you are solely responsible for verifying the identities of your customers using
                        the Services via API, ensuring that they are authorised to carry out the transactions on your
                        platform, and determining their eligibility to purchase your products and services. You are also
                        required to maintain information and proof of service or product delivery to your customer.
                        Where a dispute occurs needing resolution, you may be required to provide Biller with these.{' '}
                    </p>

                    <h4>Indemnification</h4>
                    <p>
                        You hereby indemnify Biller and undertake to keep Biller, its staff and affiliates indemnified
                        against any losses, damages, costs, liabilities and expenses (including without limitation
                        reasonable legal fees and expenses) arising out of any breach by you of any provision of these
                        Terms, or arising out of any claim that you have breached any provision of these Terms. You will
                        indemnify and hold Biller harmless from and against any claim, suit or proceedings brought
                        against Biller arising from or in connection with violations of Intellectual Property or other
                        rights of third parties in relation to your use of the Services.
                    </p>

                    <h4>Breaches of these Terms</h4>
                    <p>
                        Without prejudice to DataNow’s other rights under these Terms, if you breach these Terms in any
                        way, Biller may take such action as Biller deems appropriate to deal with the breach, including
                        suspending your access to your account, debiting data, airtime and Naira wallets, prohibiting
                        you from accessing the website, blocking computers using your IP address from accessing the
                        website, contacting your internet service provider to request that they block your access to the
                        website and/or bringing court proceedings against you.
                    </p>

                    <h4>Notification of Errors</h4>
                    <p>
                        You agree to notify us immediately any error is detected while reconciling transactions that
                        have occurred using the Services. We will investigate and rectify the errors where verified. In
                        the event that we notice any errors, we will also investigate and rectify such errors. Where we
                        owe you money as a result of such errors, we will refund the amounts owed to you by a bank
                        transfer to your Bank Account or airtime or data wallet. If a transaction is erroneously
                        processed through your platform, report to us immediately. We will investigate any such reports
                        and attempt to rectify the errors by crediting or debiting your data, airtime or Naira wallets
                        as appropriate. Failure to notify us within 5 (five) days of the occurrence of an error will be
                        deemed a waiver of your rights to amounts that are owed to you due to an error.
                    </p>

                    <h4>Security and Fraud Controls</h4>
                    <p>
                        You agree to use measures that are appropriate for your business to reduce the risk of fraud. In
                        the event that you suspect any fraudulent activity by a customer, you agree to notify Biller
                        immediately and quit the delivery of the service. In addition, where we suspect that there have
                        been frequent fraudulent transactions on your account, we reserve the right to cancel our
                        service to you and/or your account
                    </p>

                    <h4>Termination</h4>
                    <p>
                        You may terminate this Agreement by closing your Biller Account. We may suspend your Biller
                        Account and your access to Biller services and any funds, or terminate this Agreement, if;
                    </p>
                    <ol>
                        <li>You do not comply with any of the provisions of this Agreement;</li>
                        <li>We are required to do so by a Law; </li>
                        <li>We are directed by a Card Network or issuing financial institution; or</li>
                        <li>Where a suspicious or fraudulent transaction occurs</li>
                    </ol>

                    <h1 className=" text-left text-dark">Biller Privacy Policy</h1>

                    <p>
                        Biller Financial Technologies Limited, the owners of biller.ng (“biller”) respects your right to
                        privacy and is committed to the responsible use of the information that you provide through the
                        Biller.ng Internet site. Please review this statement of Biller’s policy on the collection and
                        use of your personal information.
                    </p>

                    <h4>INFORMATION COLLECTION AND USE</h4>
                    <p>
                        When visiting Biller.ng, you may provide your name, email address, company name or phone number
                        in conjunction with submitting a comment, question, or request to Biller. This personal
                        information is used to respond to your submission and may also be used to provide you with
                        Biller’s marketing material. Biller does not send or use cookies on the Biller.ng Internet site.
                    </p>

                    <h4>THIRD-PARTY ACCESS TO THE INFORMATION</h4>
                    <p>
                        Biller does not sell, trade, rent, or otherwise release your contact information to third
                        parties unless Biller believes, in good faith, that release of the information is reasonably
                        necessary to comply with law.
                    </p>

                    <h4>SECURITY</h4>
                    <p>
                        Biller uses good faith efforts to maintain physical, electronic, and procedural safeguards to
                        guard your nonpublic personal information. However, while we strive to protect your personal
                        information, we do not ensure or warrant the security of any information you transmit to us, and
                        you do so at your own risk.{' '}
                    </p>

                    <p>
                        The Biller website may contain links to other Internet sites or resources. These other sites may
                        send their own cookies to users, collect data, or solicit personal information. Biller does not
                        have any control over these other sites, and is not responsible for the actions or privacy
                        policies of any linked site or any link contained in a linked site, or any changes or updates to
                        such sites. Biller provides these links to these other sites to you only for your convenience,
                        and the inclusion of any link does not imply endorsement by Biller of any of the policies of the
                        other sites.
                    </p>
                </Col>
            </Row>

            <div>
                <FooterBar />
            </div>
        </React.Fragment>
    );
};

export default PrivacyPolicy;

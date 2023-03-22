import React, { useContext, useEffect } from 'react';
import { Button, Carousel, Col, Row } from 'react-bootstrap';
import billerFullPrimary from '../../images/billerFullPrimary.svg';
import TopBar from '../../components/TopBar';
import FooterBar from '../../components/FooterBar';

import { Link } from 'react-router-dom';
import API from '../../helpers/API';

const PrivacyPolicy = () => {
    document.title = 'Privacy Policy - Biller';

    return (
        <React.Fragment>
            <TopBar setNavCollapse={false} />

            <h1 className="m-3 text-center text-dark">Biller Privacy Policy</h1>

            <Row className="justify-content-center">
                <Col xs="12" md="8">
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
                    <p>
                        This policy is effective as of April 1, 2022. Any updates to this policy will be posted on this
                        webpage.
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

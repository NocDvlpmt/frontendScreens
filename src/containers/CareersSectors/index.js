/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-named-as-default */

/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import style from './style';
import { useHistory, useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Header from '../../components/header';
import Card from '../../components/card';
import Layout from '../../components/layout/index.js';
import { dFlex } from '../../assets/styles/flexbox';
import styles from '../../assets/styles/base';
import {
  celestialBlue, lightCyan, lightGreyColor, paperColor, skyBlueColor
} from '../../assets/styles/colors';
import { w100 } from '../../assets/styles/reset';
import {
  fontSize14, fontSize28, gothicSemiBold, w700
} from '../../assets/styles/typography';
import SearchBar from '../../components/searchBar';
import { m3, mLeft0, pLeft6 } from '../../assets/styles/spacing';
import { careerSectors, searchCareerSectors } from '../../services/careers';
import BreadCrumb from '../../components/breadCrumb';
import LoaderProvider from '../../hooks/use-loader';

const container = css`
    width: 80%;
    padding-left: 10%;
    padding-bottom: 5px;
   
 `;

const srchWrapper = css`
    background-color: ${paperColor};
    padding: 13px;
    margin : 5px 0px;
    box-shadow: 0 0 0 1px rgba(63,63,68,0.05), 0 1px 2px 0 rgba(63,63,68,0.15);
    `;

const header = css`
  background-color: ${lightCyan};
//    ${pLeft6}
  `;

const links = [
  { link: '/', value: 'Home' },
  { link: '/sectors', value: 'CareerSectors' }
];

const CareersPage = () => {
  const history = useHistory();
  const [sectors, setSectors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { show, hide } = LoaderProvider();

  const getInitialData = async () => {
    try {
      show();
      const response = await careerSectors();
      setSectors(response);
      hide();
    } catch (error) {
      // setErrorFlag(true);
      // handleError(error, setError, '/returnb2c', [getOrderRefundDataB2cService]);
      // hide();
    }
  };

  useEffect(() => {
    getInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSectorClick = id => {
    history.push(`/careers/${id}`);
  };

  const handleClick = link => {
    history.push(link);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      const body = { name: searchTerm };
      show();
      const response = await searchCareerSectors(body);
      setSectors(response);
      hide();
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  return (
    <React.Fragment>
      <Navbar fixed barColor={lightCyan} />
      {/* Header */}
      <div css={header}>
        <div css={[container]}>
          <div css={[fontSize28, w700, gothicSemiBold]}>Career Options of India</div>
          <div css={[m3, mLeft0, gothicSemiBold]}>
            Ex nostrud sit officia incididunt ut cupidatat duis aliquip reprehenderit occaecat aute velit.
            Eiusmod in sint eiusmod anim nulla eiusmod
            reprehenderit magna officia culpa nisi.
            Ex voluptate anim ut irure qui pariatur dolore fugiat voluptate ex consequat reprehenderit. Minim labore consequat voluptate commodo
            ipsum elit duis.

          </div>

        </div>

      </div>

      <div css={[container]} style={{ marginTop: '10px' }}>
        <BreadCrumb listOfLinks={links} />
      </div>

      <Layout contentStyle={styles.layoutContainer}>
        <div style={{ width: '100%' }} css={srchWrapper}>
          <SearchBar searchvalue={handleSearch} />
        </div>
        <section css={styles.gridStyle}>
          {sectors.map(item => (
            <div onClick={() => handleSectorClick(item._id)}>
              <Card details={item} />
            </div>
          ))}

          {/* <Card details /> */}
        </section>
      </Layout>

    </React.Fragment>
  );
};

export default CareersPage;

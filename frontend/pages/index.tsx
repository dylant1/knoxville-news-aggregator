import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { textVide } from "text-vide";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../styles/ThemeConfig";

const Footer = styled.footer`
  background-color: black;
  color: white;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
`;
const Hero = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Column = styled.div`
  width: 35%;
`;
const ColumnHero = styled.div`
  margin-top: 15px;
`;
const Break = styled.span`
  display: block;
  width: 100%;
  border-top: 1px solid #ccc;
`;
const NewsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const Headline = styled.a`
  font-size: 1em;
  &:hover {
    text-decoration: underline;
  }
`;
const HeadlineWrapper = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`;
const JobsWrapper = styled.div``;
const Row = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const PastXDaysWrapper = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
`;
const PastXDays = styled.span<any>`
  background-color: ${(props) => props.backgroundColor};
  padding: 1px 4px;
  border-radius: 10px;
  font-size: 14px;

  border: 1px solid black;
  margin-right: 4px;
  cursor: pointer;
  margin-top: 5px;
`;
const Header = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 25px;
  // font-weight: 500;
  text-decoration: underline;
  color: ${(props) => props.color}
  // padding-bottom: 25px;
  // margin-top: 5px;
  cursor: pointer;
  font-family: "Garamond", serif;
  font-weight: bold;
`;
const HeaderWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`;
const DateWrapper = styled.div`
  font-size: 10px;
  color: #58595b;
  margin-top: 2px;
  margin-bottom: 2px;
`;
const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  height: 30px;
  background-color: #161616;
  color: white;
  align-items: center;
`;
const NavbarItem = styled.div`
  font-size: 1em;
  display: flex;
  flex-direction: row;
  align-content: center;
  margin-right: 20px;
`;
interface IProps {
  utk?: any;
  knox?: any;
}
const Home: NextPage<any> = ({ utk, knox }) => {
  const [utkNews, setUtkNews] = useState<any>([]);
  const [knoxNews, setKnoxNews] = useState<any>([]);
  const [pastXDays, setPastXDays] = useState(0);
  const [bionic, setBionic] = useState(false);
  const [knoxPastXDays, setKnoxPastXDays] = useState(2);
  const [utkPastXDays, setUtkPastXDays] = useState(2);
  const [showUtkNews, setShowUtkNews] = useState<boolean>(true);
  const [showKnoxNews, setShowKnoxNews] = useState<boolean>(true);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };
  useEffect(() => {
    if (showUtkNews && utk) {
      setUtkNews(utk);
    }
    if (showKnoxNews && knox) {
      setKnoxNews(knox);
    }
  }, [showKnoxNews, showUtkNews, utk, knox]);
  const PastWrapper = () => {
    return (
      <PastXDaysWrapper>
        <span
          style={{
            marginRight: "4px",
            fontWeight: "bold",
            marginTop: "5pxe",
          }}
        >
          Past
        </span>
        <PastXDays backgroundColor={pastXDays == 2 ? "#FF8200" : "none"}>
          Day
        </PastXDays>
        <PastXDays backgroundColor={pastXDays == 7 ? "#FF8200" : "none"}>
          Week
        </PastXDays>
        <PastXDays backgroundColor={pastXDays == 30 ? "#FF8200" : "none"}>
          Month*
        </PastXDays>
      </PastXDaysWrapper>
    );
  };

  return (
    <ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <div>
        <Head>
          <title>Knoxville News Feed</title>
          <meta name="description" content="Generated by create next app" />
          {/* <link rel="icon" href="/favicon.ico" /> */}
        </Head>

        <NavbarWrapper>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <NavbarItem>
              <label htmlFor="utk-news">UTK News</label>
              <input
                type="checkbox"
                name="utk-news"
                value="utk-news"
                id="utk-news"
                onChange={() => {
                  setShowUtkNews(!showUtkNews);
                }}
                defaultChecked
              />
            </NavbarItem>
            <NavbarItem>
              <label htmlFor="knox-news">Knox News</label>
              <input
                type="checkbox"
                name="knox-news"
                value="knox-news"
                id="knox-news"
                onChange={() => {
                  setShowKnoxNews(!showKnoxNews);
                }}
                defaultChecked
              />
            </NavbarItem>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <NavbarItem>
              <label htmlFor="bionic">Bionic Reading</label>
              <input
                type="checkbox"
                name="bionic"
                value="bionic"
                id="bionic"
                onChange={() => {
                  setBionic(!bionic);
                }}
              />
            </NavbarItem>
            <NavbarItem>
              <label htmlFor="theme">Dark Mode</label>
              <input
                type="checkbox"
                name="theme"
                value="theme"
                id="theme"
                onChange={toggleTheme}
              />
            </NavbarItem>
          </div>
        </NavbarWrapper>
        <Hero>
          <NewsWrapper>
            <Column>
              {showKnoxNews && (
                <div>
                  <HeaderWrapper>
                    <Header color={theme == "light" ? "black" : "#FF8200"}>
                      Knox News
                    </Header>
                  </HeaderWrapper>
                  {/* <PastWrapper /> */}

                  <ColumnHero>
                    {knoxNews &&
                      knoxNews.map((headline: any) => {
                        return (
                          <HeadlineWrapper key={headline.id}>
                            {bionic ? (
                              <Headline
                                href={headline.link}
                                dangerouslySetInnerHTML={{
                                  __html: textVide(headline.headline),
                                }}
                              ></Headline>
                            ) : (
                              <Headline href={headline.link}>
                                {headline.headline}
                              </Headline>
                            )}
                            <DateWrapper>{headline.date}</DateWrapper>
                            <Break />
                          </HeadlineWrapper>
                        );
                      })}
                  </ColumnHero>
                </div>
              )}
            </Column>

            <Column>
              {showUtkNews && (
                <div>
                  <HeaderWrapper>
                    <Header>UTK News</Header>
                  </HeaderWrapper>{" "}
                  {/* <PastWrapper /> */}
                  {utkNews &&
                    utkNews.map((headline: any) => {
                      return (
                        <HeadlineWrapper key={headline.id}>
                          {bionic ? (
                            <Headline
                              href={headline.link}
                              dangerouslySetInnerHTML={{
                                __html: textVide(headline.headline),
                              }}
                            ></Headline>
                          ) : (
                            <Headline href={headline.link}>
                              {headline.headline}
                            </Headline>
                          )}
                          <DateWrapper>{headline.date}</DateWrapper>
                          <Break />
                        </HeadlineWrapper>
                      );
                    })}
                </div>
              )}
              <div>
                <HeaderWrapper>
                  <Header>Jobs</Header>
                </HeaderWrapper>
                <div>Coming Soon...</div>
           
              </div>
            </Column>
          </NewsWrapper>
         
        </Hero>

        <Footer>
          <div>Github</div>
        </Footer>
      </div>
    </ThemeProvider>
  );
};

Home.getInitialProps = async (ctx: any) => {
  // let to = new Date().toISOString().split("T")[0];
  // let from: Date = new Date(to);
  // from.setDate(from.getDate() - 2);
  // let isoFrom = from.toISOString().split("T")[0];
  // const res = await fetch(
  //   `http://localhost:5050/headlines/${Date.parse(to)}-${Date.parse(isoFrom)}`
  // );
  // const days = await res.json();
  try {
    const res = await fetch(
      "https://protected-fjord-45227.herokuapp.com/headlines/news.utk.edu"
    );
    const utk = await res.json();
    const res2 = await fetch(
      "https://protected-fjord-45227.herokuapp.com/headlines/knoxnews.com"
    );
    const knox = await res2.json();
    return { utk: utk, knox: knox };
  } catch (err) {
    console.log(err);
    return err;
  }
};
export default Home;

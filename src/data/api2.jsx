"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "../../app/import.css";
import Header from "@/app/(primary)/component/header";
import { TbEye } from "react-icons/tb";
import { BsJustifyLeft } from "react-icons/bs";
import { PiTagSimpleBold, PiListBulletsBold } from "react-icons/pi";
import { BiIdCard } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";
import { SlGraph } from "react-icons/sl";
import { LuListTodo } from "react-icons/lu";
import { TbClockHour5 } from "react-icons/tb";
import { PiArrowsDownUpBold } from "react-icons/pi";
import Footer from "@/app/(primary)/component/footer";
import { NextSeo } from "next-seo";
import { getConvertToUSD, getItemActivity, getNftView } from "@/request/request";

export default function Page() {
  const router = useRouter();

    
        
          
    

        
        Expand All
    
    @@ -30,32 +31,26 @@ export default function Page() {
  
  const [slug, setSlug] = useState();
  const [viewdata, setViewData] = useState();
  const [image_url, setImageUrl] = useState();
  const [activity, setActivity] = useState();
  const [collection, setCollection] = useState();
  const [priceAvailable, setPriceAvailable] = useState(false);
  const [offer, setOffer] = useState();
  const [ethprice, setEthPrice] = useState();
  const [usdprice, setUSDPrice] = useState();

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const NEXT_PUBLIC_OPENSEA_APIKEY = process.env.NEXT_PUBLIC_OPENSEA_APIKEY;

  const fetchNftDetails = async (slug) => {
    const data = await getNftView(slug);
    setViewData(data.nft);
    let replacedImg = data.nft.image_url ? data.nft.image_url.replace("ikzttp.mypinata.cloud", "ipfs.io") : process.env.NEXT_PUBLIC_DEFAULT_NFT;
    setImageUrl(replacedImg);
    fetchCollection(data.nft.collection);
    fetchBestOffer(data.nft.collection, slug[2]);
  };

  const convertToUSD = async (currency, price) => {
    let data = await getConvertToUSD(currency)
    let usd = parseFloat(data.USD) * parseFloat(price);
    setUSDPrice(usd.toFixed(2)); // data.USD;
  };

  const fetchBestOffer = async (slug, identifier) => {
    let url = `${BASE_URL}/api/v2/listings/collection/${slug}/nfts/${identifier}/best`;
    const options = { method: "GET", headers: { accept: "application/json", "x-api-key": NEXT_PUBLIC_OPENSEA_APIKEY } };
    const response = await fetch(url, options);
    const data = await response.json();
    if (Object.keys(data).length === 0 && data.constructor === Object) {

    
        
          
    

        
        Expand All
    
    @@ -73,19 +68,15 @@ export default function Page() {
  
      console.log("No Offer");
    } else {
      setOffer(data);
      let price = convert(
        data.price.current.value,
        data.price.current.decimals
      );
      convertToUSD(data.price.current.currency, price);
      setEthPrice(price);
      setPriceAvailable(true);
    }
  };

  const fetchCollection = async (collection) => {
    const options = { method: "GET", headers: { accept: "application/json", "x-api-key": NEXT_PUBLIC_OPENSEA_APIKEY } };
    let url = `${BASE_URL}/api/v2/collections/${collection}`;
    const response = await fetch(url, options);
    const data = await response.json();
    setCollection(data);
  };

  const fetchItemActivity = async (slug) => {
    const data = await getItemActivity(slug)
    setActivity(data.asset_events);
  };


    
        
          
    

        
        Expand All
    
    @@ -102,43 +93,41 @@ export default function Page() {
  
  useEffect(() => {
    if (!router.isReady) return;
    let slug = router.query.slug;
    setSlug(slug);
    fetchNftDetails(slug);
    fetchItemActivity(slug);
  }, [router.isReady]);
  const convert = (v, d) => parseFloat(v) / parseFloat(10 ** d);
  return (
    <>
      <NextSeo
        title={collection?.name}
        description={viewdata?.description}
        openGraph={{
          url: "https://www.opensea.io/",
          siteName: "Opensea",
          type: "website",
          title: collection?.name,
          description: viewdata?.description,
          images: [
            {
              url: image_url,
              width: 1080,
              height: 1080,
              alt: "Opensea",
            },
          ],
        }}
        twitter={{
          handle: "https://opensea.io",
          site: "https://opensea.io/",
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            property: "twitter:title",
            content: "Opensea",
          },
          {
            property: "twitter:description",
            content:
              "Opensea.",
          },
          {
            property: "twitter:image",
            content: image_url,
          },
          {
            property: "twitter:app:country",

    
          
            
    

          
          Expand Down
          
            
    

          
          Expand Up
    
    @@ -171,7 +160,7 @@ export default function Page() {
  
            content: "IN",
          },
        ]}
      />
      <Header />
      <div className="container-max">
        <div className="row">
          <div className="col-lg-5 item-wrapper">
            <div className="item-summary">
              <section>
                <header className="flex font-medium">
                  <div className="mr-auto item-summary-header-icon">
                    <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/ethereum-eth-icon.png" />
                  </div>
                  <div className="navbar-text ml-auto">
                    <i className="px-2 fa fa-share"></i>
                    <i className="px-2 fa fa-heart-o"></i>
                  </div>
                </header>
                <div className="item-summary-img">
                  <img src={image_url} alt="nft" />
                </div>
              </section>
              <div className="border-card mb-4 mt-4">
                <div className="card-header">
                  <BsJustifyLeft className="h5 mb-0" /> Description
                </div>
                <div className="card-body">
                  <p style={{ wordWrap: "break-word" }}>{viewdata?.description}</p>
                </div>
              </div>
              <div className="border-card mb-4 mt-4">

    
          
            
    

          
          Expand Down
    
    
  
                <div className="card-header">
                  <PiTagSimpleBold className="h5 mb-0" /> Traits
                </div>
                <div className="card-body">
                  <div className="row">
                    {viewdata?.traits ? (
                      <>
                        {viewdata?.traits.map((item, index) => (
                          <div className="col-4 mb-3" key={index}>
                            <div className="bg-muted">
                              <p className="mb-1 small">{item.trait_type}</p>
                              <p className="mb-1 small font-weight-bold">
                                {item.value}
                              </p>
                              <p className="mb-1 small">
                                Floor : ----- {item.max_value}
                              </p>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="border-card mb-4 mt-4">
                <div className="card-header">
                  <BiIdCard className="h5 mb-0" /> About {collection?.name}
                </div>
                <div className="card-body">
                  <p>
                    {collection?.description === ""
                      ? "No description available"
                      : collection?.description}
                  </p>
                </div>
              </div>
              <div className="border-card mb-4 mt-4">
                <div className="card-header">
                  <TbListDetails className="h5 mb-0" /> Details
                </div>
                <div className="card-body">
                  <div className="flex">
                    <div className="col2">
                      <p className="mb-0">Contract Address :</p>
                    </div>
                    <div className="col2 text-right">
                      <p className="mb-0">
                        {viewdata?.contract.slice(0, 6)}...
                        {viewdata?.contract.substr(-4, 4)}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="col2">
                      <p className="mb-0">Token ID :</p>
                    </div>
                    <div className="col2 text-right">
                      <p className="mb-0">{viewdata?.identifier}</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="col2">
                      <p className="mb-0">Token Standard :</p>
                    </div>
                    <div className="col2 text-right">
                      <p className="mb-0">
                        {viewdata?.token_standard.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="col2">
                      <p className="mb-0">Chain :</p>
                    </div>
                    <div className="col2 text-right">
                      <p className="mb-0">
                        {collection?.contracts[0].chain.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="col2">
                      <p className="mb-0">Last Updated :</p>
                    </div>
                    <div className="col2 text-right">
                      <p className="mb-0">{viewdata?.updated_at}</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="col2">
                      <p className="mb-0">Creator Earnings :</p>
                    </div>
                    <div className="col2 text-right">
                      <p className="mb-0">{collection?.fees[0]?.fee} %</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 item-main">
            <p className="mb-3">
              <Link
                className="a-text"
                href={`/collection/${viewdata?.collection}`}
              >
                {collection?.name}
              </Link>
            </p>
            <h3 className="font-weight-bold">{viewdata?.name}</h3>
            <p>
              Owned by{" "}
              <span>
                <Link className="a-text" href={`/${viewdata?.creator}`}>
                  {viewdata?.creator.slice(2, 8)}
                </Link>
              </span>{" "}
            </p>
            <div className="mt-4 mb-4">
              <p>
                <TbEye className="h5 mb-0" /> 2.9K views | 107 favorites
              </p>
            </div>
            <div className="border-card mb-4">
              {/* <div className="card-header transparent">
                <p>Sale ends 11 February 2024 at 7:55 am </p>
                <div className="row ">
                  <div className="col-lg-6 m-0 p-0">
                    <div className="flex">
                      <div className="col-3">
                        <h3>01</h3>
                        <p>Days</p>
                      </div>
                      <div className="col-3">
                        <h3>13</h3>
                        <p>Hours</p>
                      </div>
                      <div className="col-3">
                        <h3>17</h3>
                        <p>Minutes</p>
                      </div>
                      <div className="col-3">
                        <h3>45</h3>
                        <p>Seconds</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {priceAvailable ? (
                <div className="card-body">
                  <p className="text-muted mb-2">Current price</p>
                  <h2 className="font-weight-bold">
                    {ethprice} {offer?.price?.current?.currency}
                    <span className="h6 text-muted ml-3">${usdprice}</span>
                  </h2>
                  <div className="row mt-3">
                    <div className="col-6">
                      <button className="btn btns btn-block btn-primary">
                        Buy Now
                      </button>
                    </div>
                    <div className="col-6">
                      <button className="btn btns btn-block btn-secondary">
                        Make an offer
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="border-card">
              <div className="card-header">
                <SlGraph className="h5 mb-0" /> Price History
              </div>
              <div className="card-body p-5 text-center">
                <TbClockHour5 className="h2" />
                <p className="mb-1">No events have occurred yet</p>
                <p>Check back later.</p>
              </div>
            </div>
            <div className="border-card mt-4">
              <div className="card-header">
                <LuListTodo className="h5 mb-0" /> Listings
              </div>
              <div className="card-body p-5 text-center">
                <img src="https://testnets.opensea.io/static/images/empty-bids.svg" />
              </div>
              <div className="card-body p-0 m-0">
                {/* <table className="table"> */}
                {/* <tr className="text-muted">
                    <td>Price</td>
                    <td>USD Price</td>
                    <td>Quantity</td>
                    <td>Expiration</td>
                    <td>From</td>
                    <td></td>
                  </tr>
									<tr className="text-muted">
                    <td>Price</td>
                    <td>USD Price</td>
                    <td>Quantity</td>
                    <td>Expiration</td>
                    <td>From</td>
                    <td></td>
                  </tr> */}
                {/* {offer?.protocol_data?.parameters?.offer?.map((item, index) => (
                  <tr>
                    <td className="h5 font-weight-bold"> ETH</td>
                    <td>$11,244.08</td>
                    <td>1</td>
                    <td>in 2 days</td>
                    <td>WeZPeople</td>
                    <td>
                      <button className="btn btn-sm btn-primary">Buy</button>
                    </td>
                  </tr>
									))} */}
                {/* </table> */}
              </div>
            </div>
            <div className="border-card mt-4">
              <div className="card-header">
                <PiListBulletsBold className="h5 mb-0" /> Offers
              </div>
              <div className="card-body p-5 text-center">
                <img src="https://testnets.opensea.io/static/images/empty-bids.svg" />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="border-card">
              <div className="card-header">
                <PiArrowsDownUpBold className="h5 mb-0" /> Item Activity
              </div>
              {Array.isArray(activity) && activity.length > 0 ? (
                <div className="card-body p-0 m-0">
                  <table className="table p-3">
                    <tr>
                      <th>Event</th>
                      <th>Price</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Date</th>
                    </tr>
                    {activity?.map((item, index) => (
                      <tr key={index}>
                        <td> {item.order_type} </td>
                        <td>{item.order_type} </td>
                        <td>
                          {item.from_address?.slice(0, 6)}...
                          {item.from_address?.substr(-4, 4)}
                        </td>
                        <td>
                          {item.to_address?.slice(0, 6)}...
                          {item.to_address?.substr(-4, 4)}
                        </td>
                        <td>{item.event_timestamp}</td>
                      </tr>
                    ))}
                  </table>
                </div>
              ) : (
                <div className="card-body p-5 text-center">
                  <img src="https://testnets.opensea.io/static/images/empty-bids.svg" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
import { Component, KeyboardEvent } from "react";
import { Form, Spinner, FormControl } from "react-bootstrap";
import logo from "../../assets/sideassets/crop_spotify_black.png";
import "./MyNav.css";
import ISong from "../../types/Song";
import { Link } from "react-router-dom";

interface HomeState {
  search: string;
  mouseOver: boolean;
  searchLength: number;
  // songs: ISong[]
  isLoading: boolean;
}

interface HomeProps {
  setSongs: (songs: ISong[]) => void;
}

class MyNav extends Component<HomeProps, HomeState> {
  state: HomeState = {
    search: "",
    mouseOver: false,
    searchLength: 0,
    // songs:[],
    isLoading: false,
  };

  fetchSongs = async (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        this.setState({
          ...this.state,
          isLoading: true,
          searchLength:0
        });
        const response = await fetch(
          `${process.env.REACT_APP_URL}/search?q=${this.state.search}`
        );
        const data = await response.json();
        const searchResult = await data.data;
        console.log(searchResult);
        if (response.ok) {
          this.props.setSongs(searchResult);
          this.setState({
            ...this.state,
            isLoading: false,
          });
        } else {
          console.log("error fetching songs");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    return (
      <>
        <div className="mb-5 pb-5">
          <ul className="ml-1" style={{ listStyle: "none", padding: "0" }}>
            <li>
              <Link to="/" style={{ textDecoration: "none" }}>
                <img
                  className="img-fluid  mb-2 mr-2"
                  style={{ width: "150px" }}
                  src={logo}
                  alt="spotify-logo"
                />
              </Link>
            </li>

            <li>
              <Link to="/" style={{ textDecoration: "none", color: "#B1B1B1" }}>
                <svg
                  className="mr-4"
                  viewBox="0 0 512 512"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M448 463.746h-149.333v-149.333h-85.334v149.333h-149.333v-315.428l192-111.746 192 110.984v316.19z"
                    fill="currentColor"
                  ></path>
                </svg>
                Home
              </Link>
            </li>

            <li>
              <Link to="" style={{ textDecoration: "none", color: "#B1B1B1" }}>
                <svg
                  onClick={() =>{
                    this.props.setSongs([])
                    this.setState({
                      ...this.state,
                      search: "",
                      searchLength: 0,
                    })}
                  }
                  onMouseOver={() =>
                    this.setState({
                      ...this.state,
                      mouseOver: true,
                    })
                  }
                  className="mr-4 my-4"
                  viewBox="0 0 512 512"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z"
                    fill="currentColor"
                    fill-rule="evenodd"
                  ></path>
                </svg>
                Search
              </Link>
              {this.state.isLoading ? (
                <>
                  <Spinner animation="grow" size="sm" variant="light" />
                  <Spinner animation="grow" variant="light" />
                </>
              ) : (
                this.state.mouseOver && (
                  <Form inline>
                    <FormControl
                      style={{ width: "100%" }}
                      onKeyDown={this.fetchSongs}
                      id="custom-form-jobs"
                      value={this.state.search}
                      onChange={(e) =>
                        this.setState({
                          ...this.state,
                          search: e.target.value,
                          searchLength: Number(this.state.search.length),
                        })
                      }
                      onMouseLeave={() =>
                        this.setState({
                          ...this.state,
                          mouseOver: false,
                        })
                      }
                      type="text"
                      placeholder="Search"
                      className=" mr-sm-2"
                    />
                  </Form>
                )
              )}
            </li>

            <li>
              <Link
                to="/library"
                style={{ textDecoration: "none", color: "#B1B1B1" }}
              >
                <svg
                  className="mr-4"
                  viewBox="0 0 512 512"
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M291.301 81.778l166.349 373.587-19.301 8.635-166.349-373.587zM64 463.746v-384h21.334v384h-21.334zM192 463.746v-384h21.334v384h-21.334z"
                    fill="currentColor"
                  ></path>
                </svg>
                Your Library
              </Link>
            </li>
          </ul>
        </div>

        <div className="bottom">
          <div
            className="d-grid gap-2 d-flex flex-column text-center"
            style={{ color: "#B1B1B1" }}
          >
            <Link to="">
              <button
                className="btn btn-primary badge-pill mb-3 sign"
                type="button"
              >
                <strong>SIGN UP</strong>
              </button>
            </Link>

            <Link to="">
              <button
                className="btn btn-primary badge-pill login mb-3"
                type="button"
              >
                <strong>LOGIN</strong>
              </button>
            </Link>
          </div>

          <div className="row mb-5 text-center home-bottom">
            <div className="col-6 d-flex flex-column pr-0">
              <Link style={{ borderRight: "1px solid #B1B1B1" }} to="">
                Cookie
              </Link>
              <Link className="mt-2" to="">
                Policy
              </Link>
            </div>
            <div className="col-6 pl-1 pb-5 mb-5">
              <Link to="">Privacy</Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MyNav;

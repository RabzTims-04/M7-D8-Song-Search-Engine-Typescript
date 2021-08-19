import React, { Component } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap"
import "./Details.css"
import { Link } from "react-router-dom"
import MyNav from '../MyNav/MyNav';
import { RouteComponentProps } from "react-router-dom";
import { IAlbum, IArtist, Track } from "../../types/Details"
import Footer from '../Footer/Footer';

interface DetailsState{
    album:IAlbum
    artist:IArtist
    trackDetail:Track
    albumId:string
}

 interface DetailsProps{
   id:string
} 

class Details extends Component<RouteComponentProps<DetailsProps>, DetailsState> {

    state:DetailsState={
        album:{} as IAlbum,
        artist:{} as IArtist,
        trackDetail:{} as Track,
        albumId:this.props.match.params.id
    }

    componentDidMount =() => {
        this.fetchDetails()
    }

    fetchDetails = async() => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/track/${this.state.albumId}`)
            console.log(this.state.albumId);            
            const trackDetail = await response.json()
            console.log("trackDetail",trackDetail);
            const album = await trackDetail.album
            const artist = await trackDetail.artist
            if(response.ok){
                this.setState({
                    album,
                    artist,
                    trackDetail 
                })
            } 
        } catch (error) {
            console.log(error);
        }
    }

    handle= () => {

    }

    render() {
        return (
            <>
            <Container fluid>
            <Row>
                <Col md={2} className="mynav d-flex flex-column">

                    <MyNav setSongs={this.handle} />

                </Col>

                <Col id="content" md={10} className="pb-0">

                    <Container>
                   {/*  <Audio/> */}
                        <Row>

                            <Col md={4} className="p-0 mt-5">
                                <div className="d-flex align-center justify-content-center">
                                    <Link to="">
                                         <img id="queen" className="w-60 img-fluid"
                                         src={this.state.album?.cover_medium} alt="coverimage"/>
                                    </Link>
                                </div>
                                <h5 className="queen-II text-center mt-2">{this.state.album?.title}<br></br></h5>
                                <p className="small text-center mt-1">{this.state.artist?.name}</p>
                                <div className="text-center">
                                  <Button type="button" className="btn badge-pill btn-success btn-sm myBtn">
                                    PLAY
                                 </Button>                                   
                                </div>
                                <p className="small text-center">{this.state.album?.release_date} . {/* {this.state.album?.nb_tracks} */} SONGS</p>
                                <div className="text-center">
                                  
                                 </div>

                            </Col>

                            <Col md={8} className="mt-4" id="albumList">
                              {/* <Table className="table table-borderless">

                                <tbody id="music-album">

                                  {this.state.tracks
                                  ?this.state.tracks.map(track=>
                                   <tr id={track.id}
                                    onClick = {() =>{
                                     this.props.currentSong(track)
                                     this.props.songIsPlaying(false)
                                   } } >
                                     <td id="music-icon">
                                       
                                     </td>
                                     <td >
                                       
                                           {track.title}
                                      
                                       <p>{track.artist.name}</p>
                                     </td>
                                     <td>{track.duration}</td>
                                   </tr>
                                   ) 
                                   :<p>Loading</p>
                                  }
                                 

                                </tbody>

                              </Table> */}
     
                            </Col>

                        </Row>
                    </Container>
           
                </Col>

            </Row>

        </Container>
        <Footer currentSong={this.state.trackDetail}/>
        </>
        );
    }
}

export default Details;
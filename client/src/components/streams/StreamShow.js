import React, { useEffect } from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

const StreamShow = (props) => {
  const videoRef = React.createRef();
  const streamId = props.match.params.id;
  var player = null;

  useEffect(() => {
    props.fetchStream(streamId);
  }, []);

  useEffect(() => {
    if (player || !props.stream) {
      return;
    }

    player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${streamId}.flv`
    });

    player.attachMediaElement(videoRef.current);
    player.load();

    return () => {
      player.destroy();
    };
  });

  if (!props.stream) {
    return <div>Loading......</div>;
  }
  return (
    <div>
      <video ref={videoRef} style={{ width: '100%' }} controls={true} />
      <h1>{props.stream.title}</h1>
      <h3>{props.stream.description}</h3>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);

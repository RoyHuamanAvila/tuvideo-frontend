/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import './styles.scss';
import { useEffect, useState } from 'react';
import { useChannel } from '../../channelContext';
import CreateChannelModal from '../CreateChannelModal';

function ChannelHeader() {
  const {
    user, modEdit, setModEdit, style, tempLogo, setTempLogo, setTempUsername, updateUser,
  } = useChannel();
  const [subscribed, setSubscribed] = useState(false);
  const [open, setOpen] = useState(false);
  const [previewLogo, setPreviewLogo] = useState('');
  useEffect(() => {
    setPreviewLogo(tempLogo);
  }, [tempLogo]);
  return (
    <div id="container" className="container-header">
      {
        modEdit ? (
          <div id="temp-logo" className="logo">
            <img className="logo-img" src={previewLogo} alt="" />
            <div className="input-file">
              <input
                type="file"
                className="input-upload-image"
                onChange={(e) => {
                  setTempLogo(e.target.files[0]);
                  if (e.target.files.length !== 0) {
                    setPreviewLogo(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
              <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="camera-icon">
                <g className="style-scope yt-icon">
                  <path d="M12,10c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,10,12,10 M12,9c-2.21,0-4,1.79-4,4s1.79,4,4,4s4-1.79,4-4 S14.21,9,12,9L12,9z M14.59,5l1.71,1.71L16.59,7H17h4v12H3V7h4h0.41l0.29-0.29L9.41,5H14.59 M15,4H9L7,6H2v14h20V6h-5L15,4L15,4z" className="style-scope yt-icon" stroke="white" />
                </g>
              </svg>
            </div>
          </div>
        ) : (
          <div className="logo">
            <img className="logo-img" src={user?.logo} alt="" style={style} />
          </div>
        )
      }
      <div className="details">
        <div className="details-container">
          <div className="channel-description">
            <div className="channel-title">
              {
                modEdit ? (
                  <input
                    className="input-edit"
                    type="text"
                    placeholder={user?.username}
                    onChange={(e) => {
                      setTempUsername(e.target.value);
                    }}
                  />
                ) : user?.username
              }
            </div>
            <div className="channel-stadistics">
              {`${user?.subscribers ? user.subscribers : 'Sin'} suscriptores`}
            </div>
          </div>
          {
            modEdit ? (
              <div className="buttons-edit">
                <button className="button-blue" type="button" onClick={() => setOpen(true)}>AÑADIR ELEMENTOS</button>
                <button
                  className="button-green"
                  type="button"
                  onClick={() => {
                    updateUser();
                  }}
                >
                  GUARDAR CAMBIOS

                </button>
                <button className="button-red" type="button" onClick={() => { setModEdit(false); }}>CANCELAR CAMBIOS</button>
              </div>
            ) : (
              <div>
                {
                  subscribed ? <button type="button" className="button-gray">SUSCRITO</button>
                    : <button type="button" className="button-red">SUSCRIBIRSE</button>
                }
              </div>
            )
          }
        </div>
      </div>
      <CreateChannelModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default ChannelHeader;

import React, { useEffect, useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./SignationModal.css";

function SignationModal({
  onClose = () => {},
  onSave = () => {},
  colorOptions = null,
  gooleFontUrls = null,
  width = "400px",
  height = "200px",
}) {
  const fontColors = colorOptions ?? ["#000000", "#2293fb", "#4636e3"];
  const [fontUrls, setFontUrls] = useState(
    gooleFontUrls ?? [
      "https://fonts.googleapis.com/css2?family=Dancing Script:wght@500&display=swap",
      "https://fonts.googleapis.com/css2?family=Pacifico:wght@400&display=swap",
      "https://fonts.googleapis.com/css2?family=Lobster:wght@400&display=swap",
      "https://fonts.googleapis.com/css2?family=Caveat:wght@500&display=swap",
    ]
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [signatureImage, setSignatureImage] = useState(null);
  const [fonts, setFonts] = useState([]);
  const [selectedFontOption, setSelectedFontOption] = useState(null);
  const [selectedFontColorOption, setSelectedFontColorOption] = useState(
    fontColors[0]
  );
  const [selectedTab, setSelectedTab] = useState("type");
  const [text, setText] = useState("");
  const sigCanvas = useRef({});
  const textInputRef = useRef();

  useEffect(() => {
    const newFonts = [];

    // Create and append link elements for each font and add font name in FontOption variable
    fontUrls.forEach((fontUrl) => {
      const fontLink = document.createElement("link");
      fontLink.href = fontUrl;
      fontLink.rel = "stylesheet";
      document.head.appendChild(fontLink);

      // Extract font name using a regular expression
      const matchResult = fontUrl.match(/family=([^:]+)/);
      if (matchResult)
        newFonts.push(`${matchResult[1].replace(/\+/g, " ")}, sans-serif`);
    });

    setFonts([...fonts, ...newFonts]);
    setSelectedFontOption(newFonts[0]);
    // Cleanup function to remove the links when the component is unmounted
    return () => {
      fontUrls.forEach((fontUrl) => {
        const fontLink = document.querySelector(`link[href="${fontUrl}"]`);
        if (fontLink) {
          document.head.removeChild(fontLink);
        }
      });
    };
  }, []);

  const saveSign = () => {
    let imageUrl = "";
    if (selectedTab === "draw") {
      imageUrl = sigCanvas.current.getCanvas().toDataURL("image/png");
    } else {
      imageUrl = handleGenerateImageFromString();
      console.log("imageUrl");
    }

    if (
      (imageUrl && imageUrl !== "" && selectedTab !== "draw") ||
      (selectedTab === "draw" && !sigCanvas.current.isEmpty())
    ) {
      onSave(imageUrl);
      setSignatureImage(imageUrl);
    }
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
    onClose();
  };
  const handleTabShift = (option) => {
    setSelectedTab(option);
  };

  const calculateOptimalFontSize = (canvas, text) => {
    const ctx = canvas.getContext("2d");

    // Set a maximum font size to prevent extremely large text
    const maxFontSize = 400;

    // Start with a large font size and gradually decrease until it fits
    let fontSize = maxFontSize;

    do {
      ctx.font = `${fontSize}px ${selectedFontOption}`;
      const textWidth = ctx.measureText(text).width;
      const textHeight = fontSize; // Approximate height, assuming no line breaks

      if (textWidth < canvas.width && textHeight < canvas.height) {
        return fontSize;
      }

      fontSize--;
    } while (fontSize > 0);

    return 1; // Minimum font size
  };

  const handleGenerateImageFromString = () => {
    const textContent = textInputRef.current.value;

    // Create a new canvas element
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions (adjust as needed)
    // Set canvas dimensions based on the container's size
    const containerWidth = parseInt(width);
    const containerHeight = parseInt(height);
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    // Calculate the optimal font size
    const optimalFontSize = calculateOptimalFontSize(canvas, textContent);

    // Draw the text on the canvas, centering it
    ctx.font = `${optimalFontSize - 2}px ${selectedFontOption}`;

    // Set font color
    ctx.fillStyle = selectedFontColorOption;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(textContent, containerWidth / 2, containerHeight / 2);

    // Convert the canvas to a data URL representing the image
    const imageDataURL = canvas.toDataURL();
    console.log(containerHeight);
    return imageDataURL;
  };

  const handleRadioChange = (event, isColorChanges = false) => {
    if (
      sigCanvas?.current &&
      sigCanvas?.current?.toData &&
      sigCanvas?.current?.toData()
    ) {
      //change the existing signature color on draw pad when color selection changes
      var dataPoints = [];
      sigCanvas.current.toData().forEach((point) => {
        point = point.map((p) => ({ ...p, color: event.target.value }));
        dataPoints.push(point);
      });
      sigCanvas.current.fromData([...dataPoints]);
    }

    if (isColorChanges) {
      setSelectedFontColorOption(event.target.value);
      return;
    }

    setSelectedFontOption(event.target.value);
  };

  const handleClearSign = () => {
    if (!isModalOpen) {
      setSignatureImage("");
      return;
    }

    if (selectedTab === "draw") {
      sigCanvas?.current?.clear();
      return;
    }

    setText("");
  };

  return (
    <>
      {isModalOpen && (
        <div
          data-testid="signatureModal"
          className="signatureModal signatureModalOverlay"
        >
          <div className="signatureModalContent">
            <div className="signatureModalTopBar">Add Signature</div>
            <div className="signatureModalTabSection">
              <ul>
                <li
                  onClick={() => handleTabShift("draw")}
                  className={selectedTab === "draw" ? "active" : ""}
                >
                  Draw
                </li>
                <li
                  onClick={() => handleTabShift("type")}
                  className={selectedTab === "type" ? "active" : ""}
                >
                  Type
                </li>
              </ul>
            </div>
            <div
              data-testid="signatureModalCanvas"
              style={{ color: selectedFontColorOption }}
            >
              <div className="signatureCanvas">
                <div className="signatureColorOptions">
                  {fontColors.map((color) => (
                    <div className="signatureColorOption" key={color}>
                      <input
                        style={{ color: color, background: color }}
                        type="radio"
                        id={`selectedFontColor-${color}`}
                        name="selectedFontColor"
                        value={color}
                        checked={selectedFontColorOption === color}
                        onChange={(e) => handleRadioChange(e, true)}
                      />
                      <label
                        htmlFor={`selectedFontColor-${color}`}
                        className="selectedFontColor"
                      ></label>
                    </div>
                  ))}
                </div>
                {selectedTab && selectedTab === "type" ? (
                  <input
                    className="signatureModalFontInput"
                    type="text"
                    ref={textInputRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Signature"
                    style={{ fontFamily: selectedFontOption, color: "inherit" }}
                  />
                ) : (
                  <SignatureCanvas
                    penColor={selectedFontColorOption}
                    canvasProps={{ width, height, className: "sigCanvas" }}
                    ref={sigCanvas}
                  />
                )}
                <button className="typeSignClear" onClick={handleClearSign}>
                  Clear Signature
                </button>
              </div>
              {selectedTab && selectedTab === "type" && (
                <div className="signatureCanvasFonts">
                  {fonts.map((font) => (
                    <span key={font} style={{ fontFamily: font }}>
                      <label htmlFor={font}>
                        <input
                          type="radio"
                          name="selectedFont"
                          id={font}
                          value={font}
                          checked={selectedFontOption === font}
                          onChange={handleRadioChange}
                        />
                        <p>{text ? text : "Signature"}</p>
                      </label>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="signatureModalBottomBar">
              <button
                onClick={handleCancel}
                className="signatureModalSecondaryButton"
              >
                Cancel
              </button>
              <button
                onClick={saveSign}
                className="signatureModalPrimaryButton"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="signedImageHolder" style={{ width, height }}>
        {signatureImage ? (
          <>
            <img src={signatureImage} alt="signedImage" />
            <button onClick={handleClearSign}>clear sign</button>
          </>
        ) : (
          <button onClick={() => setModalOpen(true)}>sign</button>
        )}
      </div>
    </>
  );
}

export default SignationModal;

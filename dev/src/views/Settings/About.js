import { h } from "hyperapp";
const About = ({ state }) => {
    return (
        <div class="">
            Linkcast v{state.version}
            <p />
            <p>
                Web Linkcast:{" "}
                <a
                    target="_blank"
                    href={`chrome-extension://${chrome.runtime.id}/popup.html`}
                    id="linkcast-web"
                >
                    Click here
                </a>
            </p>
            <p />
            <p />
            <span id="random_quote" />
            <div style="position:absolute;bottom: 42px;">
                For any bugs, log them{" "}
                <a
                    target="_blank"
                    href="https://github.com/ajaxtown/linkcast/issues"
                >
                    here
                </a>
            </div>
        </div>
    );
};

export default About;

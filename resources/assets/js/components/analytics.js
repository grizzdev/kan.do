import { Component as BaseComponent, h } from 'preact';
import { connect } from 'preact-redux';

class Component extends BaseComponent {
    componentDidMount() {
        if (this.props.gaid) {
            if (!window.ga) {
                window.ga = () => {};
                window.ga.q = [];
                window.ga.l = +new Date;
            }

            window.ga('create', this.props.gaid, 'auto');
            window.ga('send', 'pageview');
        }
    }

    render({ gaid }) {
        if (gaid) {
            return (
                <analytics>
                    <script src='https://www.google-analytics.com/analytics.js' async defer />
                </analytics>
            );
        }

        return (
            <analytics />
        );
    }
}

const mapStateToProps = (state) => ({
    gaid: state.google && state.google.analytics && state.google.analytics.id,
});

export default connect(mapStateToProps)(Component);
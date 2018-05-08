class Stopwatch extends React.Component {
    constructor(props) {
        super(props);

        this.running = false;
        
        this.state = {
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            results: []
        };
    }

    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        });
    }

	format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

	start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
    	}
	}

	step() {
        if (!this.running) return;
        this.calculate();
	}

	calculate() {
        this.setState(prevState => {
            prevState.times.miliseconds += 1;
            if (prevState.times.miliseconds >= 100) {
                prevState.times.seconds += 1;
                prevState.times.miliseconds = 0;
            }
            if (prevState.times.seconds >= 60) {
                prevState.times.minutes += 1;
                prevState.times.seconds = 0;
            }

            return prevState;
        });
	}

	stop() {
    	this.running = false;
    	clearInterval(this.watch);
	}

    resetTimes() {
        this.reset();
    }

    save() {
        const results = this.state.results.slice();
        results.push(this.format(this.state.times));

        this.setState({ results });
    }    

    clearList() {
        this.setState({results: []})
    }

    clear() {
        const results = this.state.results.slice(0, -1);

        this.setState({ results });
    }

    render() {
        return (
            <div>
                <nav class="controls">
                    <a href="#" class="button" onClick={this.start.bind(this)}>Start</a>
                    <a href="#" class="button" onClick={this.stop.bind(this)}>Stop</a>
                    <a href="#" class="button" onClick={this.resetTimes.bind(this)}>Reset</a>
                    <a href="#" class="button" onClick={this.save.bind(this)}>Save</a>
                    <a href="#" class="button" onClick={this.clear.bind(this)}>Clear</a>
                    <a href="#" class="button" onClick={this.clearList.bind(this)}>Clear list</a>
                </nav>
                <div class="stopwatch">
                    {this.format(this.state.times)}
                </div>
                <ul class="results">
                    {this.state.results.map(result => <li>{result}</li>)}
                </ul>
            </div>
        );
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(
    <Stopwatch />,
    document.getElementById('app')
);

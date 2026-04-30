---
layout: project
title: "Sparse Polynomial Crosscoder"
tagline: "A nonlinear, multi-layer feature decomposition for transformer interpretability"
date: 2026-03-15
featured: true
thumbnail: /assets/images/projects/spc-thumb.svg
links:
  - {label: "Paper", url: "#"}
  - {label: "Code",  url: "#"}
---

*[Placeholder write-up demonstrating the project layout — replace with the real content.]*

## Background

A standard sparse autoencoder (SAE) decomposes a single residual-stream
activation $x \in \mathbb{R}^d$ into a sparse code $z \in \mathbb{R}^k$
via an encoder $E$ and reconstructs it through a linear decoder $D$:

$$
\hat{x} = D z, \qquad z = \mathrm{ReLU}(E x - b).
$$

A *crosscoder* generalises this to multiple layers, learning a single
feature dictionary that jointly reconstructs activations across layers
$\ell_1, \dots, \ell_L$. The linearity of the decoder limits how much
cross-layer interaction it can express in a single feature.

## Method

The Sparse Polynomial Crosscoder (SPC) replaces the linear decoder
with a low-degree polynomial map. For a degree-$p$ decoder and target
layer $\ell$:

$$
\hat{x}^{(\ell)} = \sum_{i=1}^{p} W_i^{(\ell)}\, z^{\odot i},
$$

where $z^{\odot i}$ denotes the $i$-th elementwise power of the code
and $W_i^{(\ell)}$ is the layer-$\ell$ decoder weight at degree $i$.
The training objective is the standard reconstruction-plus-sparsity
loss, summed across layers:

$$
\mathcal{L} = \sum_{\ell} \big\| x^{(\ell)} - \hat{x}^{(\ell)} \big\|_2^2
            + \lambda \, \| z \|_1.
$$

### Training loop

A minimal PyTorch sketch of a single training step:

```python
def train_step(activations, model, opt, lambda_):
    z = model.encode(activations)
    x_hat = model.decode(z)                          # polynomial decode
    recon = (activations - x_hat).pow(2).sum(dim=-1).mean()
    sparse = z.abs().sum(dim=-1).mean()
    loss = recon + lambda_ * sparse
    loss.backward()
    opt.step()
    opt.zero_grad()
    return loss.item()
```

The decoder weights `W_i` are kept tractable via a factored
parameterisation; see the paper for the full construction.

## Results

<figure>
  <img src="/assets/images/projects/spc-thumb.svg" alt="Schematic of the SPC architecture">
  <figcaption>Schematic of the polynomial decoder applied across two transformer layers.</figcaption>
</figure>

> On most benchmarks, SPC reaches comparable reconstruction quality
> to a linear crosscoder at substantially higher sparsity, while
> exposing nonlinear interactions that a linear decoder cannot
> represent.

[Headline numbers, ablations, and downstream interpretability tasks
go here.]
